<template>
  <div id="googleSignIn"></div>
</template>

<script>
  export default {
    name: 'googleSignIn',
    props: {
      className:String,
      callBack:Function
    },
    mounted() {
      // eslint-disable-next-line no-undef
      gapi.signin2.render('googleSignIn', {
        onsuccess: this.onSignIn
      });

      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   console.log('User signed out.');
      // });
    },
    methods:{
      onSignIn: function (googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        var profile = googleUser.getBasicProfile();
        if(typeof this.callBack === "undefined")
        // eslint-disable-next-line no-console
          console.warn("Google Sign In --> Specify the callback method to get the data");
        else if(typeof this.callBack !== "function")
        // eslint-disable-next-line no-console
          console.warn("Google Sign In --> Callback must be a valid Function");
        else {
          this.callBack({
            id_token, id: profile.getId(),
            name: profile.getName(),
            image: profile.getImageUrl(),
            email: profile.getEmail()
          });
        }
      }
    }
  }
</script>

