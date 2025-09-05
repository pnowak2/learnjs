# Complete Machine Learning Bootcamp (Udemy)

## Useful Conda Commands

### Create a Conda Environment

```bash
conda create --prefix ./env pandas numpy matplotlib scikit-learn
```

### Activate the Environment

```bash
conda activate ./env
```

### Install Jupyter

```bash
conda install jupyter
```

### Start Jupyter Notebook

```bash
jupyter notebook
```

---

## Exporting the Environment

To export the environment as a YAML file:

```bash
conda env export --prefix ./env > environment.yml
```

---

## Creating an Environment from a YAML File

### Using Environment Name

```bash
conda env create --file environment.yml --name env_from_file
```

### Using Environment Prefix (Recommended)

```bash
conda env create --file environment.yml
```