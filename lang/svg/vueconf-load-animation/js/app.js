var app = new Vue({
  el: "#app",
  data: {
    showTreeLeftBase: false,
    showTreeLeftCircleBottom: false,
    showTreeLeftCircleTop: false,
    showTreeRightBase: false,
    showTreeRightCircle: false,
    showBushCircleLeft: false,
    showBushCircleRight: false,
    showSun: false,
    treeLeftBaseClass: "",
    treeLeftCircleBottomClass: "",
    treeLeftCircleTopClass: "",
    treeRightBaseClass: "",
    treeRightCircleClass: "",
    bushCircleLeftClass: "",
    bushCircleRightClass: "",
    sunClass: ""
  },
  methods: {
    toggleTreeLeftBase: function () {
      this.showTreeLeftBase = true;
      this.treeLeftBaseClass = "growActive",
        setTimeout(() => {
          this.toggleTreeLeftCircleBottom();
          this.toggleTreeRightBase();
          this.toggleBushCircleLeft();
        }, 500);
    },

    toggleTreeLeftCircleBottom: function () {
      this.showTreeLeftCircleBottom = true;
      this.treeLeftCircleBottomClass = "growShrinkActive";
      setTimeout(() => {
        this.toggleTreeLeftCircleTop();
      }, 500);
    },
    toggleTreeLeftCircleTop: function () {
      this.showTreeLeftCircleTop = true;
      this.treeLeftCircleTopClass = "growShrinkActive";
    },
    toggleTreeRightBase: function () {
      this.showTreeRightBase = true;
      this.treeRightBaseClass = "growShrinkActive";
      setTimeout(() => {
        this.toggleTreeRightCircle();
      }, 500);
    },
    toggleTreeRightCircle: function () {
      this.showTreeRightCircle = true;
      this.treeRightCircleClass = "growShrinkActive";
      setTimeout(() => {
        this.toggleSun()
      }, 250)
    },
    toggleBushCircleLeft: function () {
      this.showBushCircleLeft = true;
      this.bushCircleLeftClass = "growShrinkActive";
      setTimeout(() => {
        this.toggleBushCircleRight();
      }, 500);
    },
    toggleBushCircleRight: function () {
      this.showBushCircleRight = true;
      this.bushCircleRightClass = "growShrinkActive";
    },
    toggleSun: function () {
      this.showSun = true;
      this.sunClass = "sun growShrinkActive";
    }
  },
  created() {
    setTimeout(() => this.toggleTreeLeftBase(), 2000);
  }
});

