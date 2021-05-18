# WAP - Web attacking proxy

Open source alternative to burpsuite written using React JS and node JS!

> **Warning: This is completely WIP and does not have the full feature set of other softwares!**

**Screenshots**

<img src="https://github.com/ksharinarayanan/WAP/blob/master/front-end/screenshots/WAP - proxy.png" />

<img src="https://github.com/ksharinarayanan/WAP/blob/master/front-end/screenshots/WAP - Dashboard.png" />

**Installation**

Currently, we don't have a one click installation setup. Though setting up is really easy, it should be up and running within about 5 minutes.

> Though the below setup is demonstrated using `yarn` , the equivalent commands also work with `npm`

- Git clone this repository

- `yarn install`

- `cd Proxy && yarn install && cd ..`

- `cd front-end && yarn install`

- `yarn global add anyproxy && anyproxy`

- Now, a proxy server runs on port `8001` and a web interface on `8002` . Navigate to the web interface at `localhost:8002`, and you can download the CA certificate from the left sidebar.

- After downloading it, import it inside your web browser of choice just like you would do with burpsuite.

- Navigate to the root directory of the cloned repository.

- `cd Proxy/ and yarn start `

- Let that process run and open a new terminal again in the root directory of the folder.

- Run `yarn run dev`

  That's it, an electron app opens up and you are ready to go :rocket:

**The project is still in it's nascent state, and contributions of any form would be really helpful 😁**
