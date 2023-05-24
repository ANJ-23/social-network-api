# Social Network API

## Description

This social network API uses routing and MongoDB databases to simulate a social media network. Users can create accounts, add "thoughts" for each user, and add "reactions" for each thought.

## Installation

If Node.js and MySQL are not already installed in your system, you can get them at <https://nodejs.org> and <https://dev.mysql.com/downloads/mysql/>, respectively. Once installed, download the files in the repository. The files can then be run in a command line window (either Command Prompt, Terminal, or Git Bash depending on what your system & what you have installed).

Open MySQL, create a workbench, copy-and-paste the text from *schema.sql*, then click on the left lightning bolt button to initialize the database.

Within the command line, type "npm i" to install the app's dependencies.

## Usage

Open the files in a command line, then type either "node server.js" or "npx nodemon server.js". In an API fetch app like [Insomnia](https://insomnia.rest/), the user may input `http://localhost:3001/api/(URL_arguments_here)` in the URL header. Different GET (obtain), POST (create), PUT (update), and DELETE (remove) arguments exist depending on the URL (see video for URL arguments).

Demonstration video: <https://drive.google.com/file/d/199-EE-z3e1D8RrkEiMYaM4lXoA1_Qn3m>

![Social Network API Example](./Assets/screenshot.jpg)

## Credits

Special thanks to the University of Minnesota - Twin Cities for jumpstarting my coding journey.

## License

MIT License

Copyright (c) [2023] [Andrew Joo]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
