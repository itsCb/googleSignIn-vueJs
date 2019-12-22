# google-signin-vue

## Project setup
```
npm install google-signin-vue
```
###Basic Setup
 To use this package, we must get the client-id from google. 
 
 - Go to [Google developer Console](https://console.developers.google.com/apis/dashboard)
 
 - Create a Project or select an existing project
 
 - Then goto oath consent tab on the left sidebar
 
 - Choose the option internal if this can be used only by the organization. For example, if you registered the organization like myowndomain.com, then anyone who has mail id with @mydomain.com registered with Gmail only can log in.
 
 - Choose the option external if anyone registered with Gmail can log in.
 
 - Then You can fill all the details.
 
 - In case you are testing in localhost, you can just enter application name (mandatory) and enter logo(optional) 
 
 - Save the Details
 
 - Goto Credentials tab on the left sidebar
 
 - Select Create Credential
 
 - Select application type as a web application, specify a name.
 
 - In the Authorized javascript origins section, enter the project domain name.
 
 - In Case of localhost just type localhost, If the project running on a specific port, enter the port like localhost:XXXX.
 
 - Now you’ll get the credentials, use only the client-id, keep your client- secret confidential. client- secret should be provided only to the backend.

###Vue Project
- In public/index.html add the below script in header
```
<script src="https://apis.google.com/js/platform.js"></script>
```
#### Inside Template
```
<googleSignIn
      :clientId="'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com'"
    />
```
#### On the script of the same template
```
import googleSignIn from 'google-signin-vue'

export default {
  name: 'app',
  components: {
    googleSignIn
  }
}
```

###Nuxt Users
 - Create app.html in the root directory of the project and add
 ```<!DOCTYPE html>
    <html {{ HTML_ATTRS }}>
    <head {{ HEAD_ATTRS }}>
      {{ HEAD }}
        <script src="https://apis.google.com/js/platform.js"></script>
    </head>
    <body {{ BODY_ATTRS }}>
    {{ APP }}
    </body>
    </html>
```
[Nuxt Js App Template Documentation](https://nuxtjs.org/guide/views#app-template)


#### Inside Template
```
<googleSignIn
      :clientId="'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com'"
    />
```
#### On the script of the same template
```
import googleSignIn from 'google-signin-vue/src/googleSignIn.vue'

export default {
  name: 'app',
  components: {
    googleSignIn
  }
}
```
####Note: You must specify the callback function as props to get the data, The supported props are given below.

| Prop                                                    |   Type   |      Required      | Description                                                                                      |
| ------------------------------------------------------- | :------: | :----------------: | ------------------------------------------------------------------------------------------------ |
| `clienId`                                               |  string  | :white_check_mark: | Client Id Obtained from google.                                                                  |
| `warning`                                               |  boolean |                    | Warnings on console is displayed on true. Default is true                                        |
| `className`                                             |  string  |                    | Any classname if needed to append on the button                                                  |
| `successCallBack`                                       | function |                    | Function to receive success data, must have one parameter                                        |
| `failureCallBack`                                       | function |                    | Function to receive failure data, must have one parameter                                        |
| `customButton`                                          |  boolean |                    | True if gonna set the custom button. Set via `<slot> Your Code Here</slot>` .                    |
| `longTitle`                                             |  boolean |                    | Google's Option to set long title. Default is false.                                             |
| `theme`                                                 |  string  |                    | Google's Option to change the button's display. 'light' / 'dark' are the only value supported.   |
| `buttonWidth`                                           |  number  |                    | Specify the Button width to google.                                                              |
| `buttonHeight`                                          |  number  |                    | Specify the Button width to google.                                                              |


