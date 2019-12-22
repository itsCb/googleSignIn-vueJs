<template>
  <div id="googleSignIn" :class="typeof className !== 'undefined' ? className : null"></div>
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
      longTitle:{
        default:false,
        type:Boolean
      },
      theme:{
        default:'light',
        type:String
      },
      scope:{
        default:'email profile id',
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
      gapi.load('auth2', function(){
        auth2 = gapi.auth2.init({
          client_id: this.client_id,
          cookiepolicy: 'single_host_origin',
        });
        // attachSignin(document.getElementById('googleSignIn'));
      });

      gapi.signin2.render('googleSignIn', {
        scope:this.scope,
        width:this.width,
        height:this.height,
        longTitle:this.longTitle,
        theme:this.theme,
        onsuccess: this.onSignIn,
        onfailure: this.onFailSignIn
      });
      this.validate();
    },
    methods:{
      validate: function () {
        if(typeof this.successCallBack === "undefined")
          this.warning ? console.warn("Google Sign In --> Specify the success callback method to get the data") : null;
        else if(typeof this.successCallBack !== "function")
          this.warning ? console.warn("Google Sign In --> Success Callback must be a valid Function") : null;
        if(typeof this.failureCallBack === "undefined")
          this.warning ? console.warn("Google Sign In --> Specify the Failure callback method to get the data") : null;
        else if(typeof this.failureCallBack !== "function")
          this.warning ? console.warn("Google Sign In --> Failure Callback must be a valid Function") : null;
      },
      onSignIn: function (googleUser) {
        let id_token = googleUser.getAuthResponse().id_token;
        let profile = googleUser.getBasicProfile();
        if (typeof this.successCallBack === "function") {
          this.successCallBack({
            id_token, id: profile.getId(),
            name: profile.getName(),
            image: profile.getImageUrl(),
            email: profile.getEmail()
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

