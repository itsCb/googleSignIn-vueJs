<template>
  <div id="hello">
    <div id="g-button"></div>
  </div>
</template>

<script>
  export default {
  name: 'HelloWorld',
  props: {
    className:String,
    callBack:Function
  },
  mounted() {
    gapi.signin2.render('g-button', {
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
          console.warn("Google Sign In --> Specify the callback method to get the data");
        else if(typeof this.callBack !== "function")
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
