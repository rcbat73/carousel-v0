# Steps to see the sample project.

1 - Clone the repo in a folder in your PC, using the command line. Type `git clone https://github.com/rcbat73/carousel-v0.git`.

2 - Go to the created folder, using the command line.

3 - Type **`npm install`**.

4 - After finishing the previous step, type **`npm start`**.

After a few seconds you can see the page in your default browser.


## Steps to build the sample project, to be ready for crownpeak developers.

- In the project folder, type: **`npm build`**.
- After a few seconds, some files and a folder will be created and copied to the "dist" folder.
From the "dist" folder, it's possible to run the project locally, just open the index.html file in a browser.


## About the development environment.

- It's used a component structure and a BEM naming convention, for folders and files.
- Each component has its folder with 3 files, scss, html and js files. 
That way it can be found in an easier way and be reused, shared, modified, even 
used with any other javascript library or framework in the future, if it's decided.
- As a multi page application or project, several html pages can be created. 
In this sample project, they are in the root of the "src" folder, but it can be placed inside a folder.
- All components and html pages files can have tags with component's names. They can be nested or not,
  Ex:
  ```
    <carousel__slider></carousel__slider>
    <carousel__slider>
      <carousel__card></carousel__card>
    </carousel__slider>.
  ```
  
- When building, all component's tags will be replaced by each component's html tags.
- The building process will create a javascript file and css file.
- Webpack was used as a static module bundler.
- A js file was created to declare all the html pages to be used, 
they source folder and file name locations and its destination after building.
- A plugin was made to find and replace all component's tag, 
and for copying the html pages to the dist folder.
