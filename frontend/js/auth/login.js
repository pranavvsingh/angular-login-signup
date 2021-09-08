function login() {
  var email = document.getElementById("name").value;
  var password = document.getElementById("Password").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email == "" && !email.match(mailformat)) {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (password == "") {
    window.alert("Please enter your password");
    password.focus();
    return false;
  }

  let loginData = {
    email,
    password,
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:8080/api/v1/login",
    data: JSON.stringify(loginData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (resultData) {
      if (resultData.status === 200) {
        alert("Login successfull");
		$('<a name="top"/>').insertBefore($('body').children().eq(0));
   		window.location.hash = 'top';
      } else {
        alert("Something went wrong!");
      }
    },
    error: function (err) {
      const error = JSON.parse(JSON.stringify(err));
      alert(error.responseJSON.data);
    },
  });
}
