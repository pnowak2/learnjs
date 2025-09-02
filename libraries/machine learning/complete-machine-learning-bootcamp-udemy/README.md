Useful infos

conda create --prefix ./env pandas numpy matplotlib scikit-learn
conda activate <path>
conda install jupyter

jupyter notebook

--

For example, to export the environment we created earlier at /Users/daniel/Desktop/project_1/env as a YAML file called environment.yml we can use the command:

conda env export --prefix /Users/daniel/Desktop/project_1/env > environment.yml

--

Finally, to create an environment called env_from_file from a .yml file called environment.yml, you can run the command:

conda env create --file environment.yml --name env_from_file

that one actually worked well
conda env create --file environment.yml --prefix ./env