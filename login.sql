// Check if the email and password match a user in the database
$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
  // Successful login
  if ($email == "ilhamisaev@proton.me" && $password == "12345") {
    // Redirect to question1.html
    header("Location: question1.html");
    exit();
  } else {
    echo "Invalid email or password!";
  }
} else {
  // Failed login
  echo "Invalid email or password!";
}