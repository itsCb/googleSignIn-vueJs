<template>
  <div id="googleSignIn" :class="typeof className !== 'undefined' ? className : null">
      <slot v-if="customButton"></slot>
  </div>
</template>

<script>
  export default {
    name: 'googleSignIn',
    props: {
      clientId:{
        type:String,
        required:true
      },
      warning:{
        default:true,
        type:Boolean
      },
      className:String,
      successCallBack:Function,
      failureCallBack:Function,
      customButton:{
        default:false,
        type:Boolean
      },
      customButtonId:{
        Default:null,
        type:String
      },
      longTitle:{
        default:false,
        type:Boolean
      },
      theme:{
        default:'light',
        type:String
      },
      scope:{
        default:'email profile openid',
        type:String
      },
      buttonWidth:{
        default:120,
        type:Number
      },
      buttonHeight:{
        default:36,
        type:Number
      },
    },
    mounted() {
        window.__google_oauth_useful_variables = {
            client_id: this.clientId,
            warning: this.warning,
            customButtonId: this.customButtonId,
            attachSignin: this.attachSignin,
            onSignIn:this.onSignIn,
            onFailSignIn:this.onFailSignIn
        };
        gapi.load('auth2', function(){
            try {
                window.auth2 = gapi.auth2.init({
                    client_id: window.__google_oauth_useful_variables.client_id,
                    cookiepolicy: 'single_host_origin',
                });
            }catch (e) {
                window.__google_oauth_useful_variables.warning ? console.warn(e):null;
            }
            try {
                if (window.__google_oauth_useful_variables.customButtonId){
                    window.__google_oauth_useful_variables.attachSignin(document.getElementById(window.__google_oauth_useful_variables.customButtonId));
                }
            }catch (e) {
                window.__google_oauth_useful_variables.warning ? console.warn(e):null;
            }
        });

        if(!this.customButton) {
            gapi.signin2.render('googleSignIn', {
                scope: this.scope,
                width: this.width,
                height: this.height,
                longTitle: this.longTitle,
                theme: this.theme,
                onsuccess: this.onSignIn,
                onfailure: this.onFailSignIn
            });
        }
      this.validate();
    },
    methods:{
      validate: function () {
        if(typeof this.successCallBack === "undefined")
          this.warning ? console.warn("Google Sign In --> Specify the success callback method to get the data") : null;
        else if(typeof this.successCallBack !== "function")
          this.warning ? console.warn("Google Sign In --> Success Callback must be a valid Function") : null;
        if(typeof this.failureCallBack === "undefined")
          this.warning ? console.warn("Google Sign In --> Specify the Failure callback method to get the Error data") : null;
        else if(typeof this.failureCallBack !== "function")
          this.warning ? console.warn("Google Sign In --> Failure Callback must be a valid Function") : null;
        if(this.customButton) {
            if(typeof this.customButtonId === 'undefined')
                this.warning ? console.warn("Google Sign In --> Please Provide customButtonId or change the customButton to false") : null;

        }
      },
        attachSignin: function (element) {
            window.auth2.attachClickHandler(element, {},
                function(googleUser) {
                    window.__google_oauth_useful_variables.onSignIn(googleUser);
                }, function(error) {
                    window.__google_oauth_useful_variables.onFailSignIn(error);
                }
            );
        },
      onSignIn: function (googleUser) {
        let id_token = googleUser.getAuthResponse().id_token;
        let profile = googleUser.getBasicProfile();
        if (typeof this.successCallBack === "function") {
          this.successCallBack({
            id_token,
            id: profile.getId() ? profile.getId() : null,
            name: profile.getName() ? profile.getName() : null,
            image: profile.getImageUrl() ? profile.getImageUrl() : null,
            email: profile.getEmail() ? profile.getEmail() : null
          });
        }
      },
      onFailSignIn:function (error) {
        if (typeof this.failureCallBack === "function")
          this.failureCallBack(error);
      }
    }
  }
</script>

