function register() {
  var firstName = document.getElementById("Firstname").value;
  var lastName = document.getElementById("Lastname").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("Password").value;
  var collegeName = document.getElementById("Collagename").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (firstName == "") {
    window.alert("Please enter your first name.");
    firstName.focus();
    return false;
  }

  if (lastName == "") {
    window.alert("Please enter your last name.");
    lastName.focus();
    return false;
  }

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

  if (collegeName == "") {
    alert("Please enter your Collagename");
    collegeName.focus();
    return false;
  }

  let registerData = {
    firstName,
    lastName,
    email,
    password,
    collegeName,
  };

  console.log("registerData", registerData);

  $.ajax({
    type: "POST",
    url: "http://localhost:8080/api/v1/register",
    data: JSON.stringify(registerData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (resultData) {
      if (resultData.status === 200) {
        alert("Thanks for registering with us!");
        $('<a name="top"/>').insertBefore($("body").children().eq(0));
        window.location.hash = "top";
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
