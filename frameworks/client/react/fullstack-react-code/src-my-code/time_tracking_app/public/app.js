const TimersDashboard = React.createClass({
	getInitialState() {
		return {
			timers: [
				{
					title: 'Practice squat',
					project: 'Gym Chores',
					id: uuid.v4(),
					elapsed: 5456099,
					runningSince: Date.now()
				},
				{
					title: 'Bake squash',
					project: 'Kitchen Chores',
					id: uuid.v4(),
					elapsed: 1273998,
					runningSince: null
				}
			]
		}
	},

	handleCreateFormSubmit(timer) {
		this.createTimer(timer);
	},

	handleEditFormSubmit(attrs) {
		this.updateTimer(attrs);
	},

	handleTrashClick(timerId) {
		this.setState({
			timers: this.state.timers.filter((t) => t.id !== timerId)
		})
	},

	handleStartClick(timerId) {
		this.startTimer(timerId);
	},

	handleStopClick(timerId) {
		this.stopTimer(timerId);
	},

	createTimer(timer) {
		const t = helpers.newTimer(timer);
		this.setState({ 
			timers: this.state.timers.concat(t) 
		});
	},

	updateTimer(attrs) {
		this.setState({
			timers: this.state.timers.map((timer) => {
				if(timer.id === attrs.id) {
					return Object.assign({}, timer, {
						title: attrs.title,
						project: attrs.project
					})
				} else {
					return timer;
				}
			})
		});
	},

  startTimer: function(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      }),
    });
  },
  stopTimer: function(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          });
        } else {
          return timer;
        }
      }),
    });
  },

	render() {
		return (
			<div className='ui three column centered grid'>
				<div className='column'>
					<EditableTimerList 
						timers={this.state.timers}
						onFormSubmit={this.handleEditFormSubmit}
						onTrashClick={this.handleTrashClick}
						onStartClick={this.handleStartClick}
						onStopClick={this.handleStopClick}
					/>
					<ToggleableTimerForm 
						onFormSubmit={this.handleCreateFormSubmit}
						isOpen={true} 
					/>
				</div>
			</div>
		);
	}
});

const EditableTimerList = React.createClass({
	render() {
		const timers = this.props.timers.map((timer) => (
			<EditableTimer
				key={timer.id}
				id={timer.id}
				title={timer.title}
				project={timer.project}
				elapsed={timer.elapsed}
				runningSince={timer.runningSince}
				onFormSubmit={this.props.onFormSubmit}
				onTrashClick={this.props.onTrashClick}
				onStartClick={this.props.onStartClick}
				onStopClick={this.props.onStopClick}
			/>
		));

		return (
			<div id='timers'>
				{timers}
			</div>
		);
	}
});

const ToggleableTimerForm = React.createClass({
	getInitialState() {
		return {
			isOpen: false
		}
	},

	handleFormOpen() {
		this.setState({ isOpen: true })
	},

	handleFormClose() {
		this.setState({ isOpen: false })
	},

	handleFormSubmit(timer) {
		this.props.onFormSubmit(timer);
		this.setState({ isOpen: false })
	},

	render() {
		if(this.state.isOpen) {
			return (
				<TimerForm
					onFormSubmit={this.handleFormSubmit}
					onFormClose={this.handleFormClose}
				/>
			);
		} else {
			return (
				<div className='ui basic content center aligned segment'>
					<button 
						className='ui basic button icon'
						onClick={this.handleFormOpen}
					>
						<i className='plus icon'></i>
					</button>
				</div>
			);
		}
	}
});

const EditableTimer = React.createClass({
	getInitialState() {
		return {
			editFormOpen: false
		}
	},

	handleEditClick() {
		this.openForm();
	},

	handleFormClose() {
		this.closeForm();
	},

	handleSubmit(timer) {
		this.props.onFormSubmit(timer);
		this.closeForm();
	},

	closeForm() {
		this.setState({ editFormOpen: false })
	},

	openForm() {
		this.setState({ editFormOpen: true })
	},

	render() {
		if(this.state.editFormOpen) {
			return (
				<TimerForm 
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
					onFormSubmit={this.handleSubmit}
					onFormClose={this.handleFormClose}
				/>
			);
		} else {
			return (
				<Timer
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
					elapsed={this.props.elapsed}
					runningSince={this.props.runningSince}
					onEditClick={this.handleEditClick}
					onTrashClick={this.props.onTrashClick}
					onStartClick={this.props.onStartClick}
					onStopClick={this.props.onStopClick}
				/>
			);
		}
	}
});

const TimerForm = React.createClass({
	handleSubmit() {
		this.props.onFormSubmit({
			id: this.props.id,
			title: this.refs.title.value,
			project: this.refs.project.value
		});
	},

	render() {
		const submitText = this.props.id ? 'Update' : 'Create';

		return (
			<div className='ui centered card'>
				<div className='content'>
					<div className='ui form'>
						<div className='field'>
							<label>Title</label>
							<input type='text' ref='title' defaultValue={this.props.title} />
						</div>

						<div className='field'>
							<label>Project</label>
							<input type='text' ref='project' defaultValue={this.props.project} />
						</div>

						<div className='ui two bottom attached buttons'>
							<button 
								className='ui basic blue button'
								onClick={this.handleSubmit}
							>
								{submitText}
							</button>

							<button 
								className='ui basic red button'
								onClick={this.props.onFormClose}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

const Timer = React.createClass({
	componentDidMount() {
		this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
	},

	componentWillUnmount() {
		clearInterval(this.forceUpdateInterval);
	},

	handleStartClick() {
		this.props.onStartClick(this.props.id);
	},

	handleStopClick() {
		this.props.onStopClick(this.props.id);
	},

	handleTrashClick() {
		this.props.onTrashClick(this.props.id)
	},

	render() {
		const elapsedString = helpers.renderElapsedString(
			this.props.elapsed,
			this.props.runningSince
		);

		return(
			<div className='ui centered card'>

				<div className='content'>
					<div className='header'>
						{this.props.title}
					</div>

					<div className='meta'>
						{this.props.project}
					</div>

					<div className='center aligned description'>
						<h2>{elapsedString}</h2>
					</div>

					<div className='extra content'>
						<span 
							className='right floated edit icon'
							onClick={this.props.onEditClick}
						>
							<i className='edit icon'></i>
						</span>

						<span 
							className='right floated trash icon'
							onClick={this.handleTrashClick}
						>
							<i className='trash icon'></i>
						</span>
					</div>
				</div>

				<TimerActionButton
					timerIsRunning={!!this.props.runningSince}
					onStartClick={this.handleStartClick}
					onStopClick={this.handleStopClick}
				/>
			</div>

		);
	}
});

const TimerActionButton = React.createClass({
	render() {
		if(this.props.timerIsRunning) {
			return (
				<div 
					className='ui bottom attached red basic button'
					onClick={this.props.onStopClick}
				>
					Stop
				</div>
			);
		} else {
			return (
				<div 
					className='ui bottom attached green basic button'
					onClick={this.props.onStartClick}
				>
					Start
				</div>
			);
		}
	}
});

ReactDOM.render(
	<TimersDashboard />,
	document.getElementById('content')
);