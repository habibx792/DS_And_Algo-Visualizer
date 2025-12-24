function logoutUser() {
  const currentUser = JSON.parse(localStorage.getItem("dsaLoggedInUser"));
  if (currentUser) {
    const allUsers = JSON.parse(localStorage.getItem("dsaUsers")) || [];
    const updatedUsers = allUsers.map(user => {
      if (user.id === currentUser.id) return { ...user, isLoggedIn: false };
      return user;
    });
    localStorage.setItem("dsaUsers", JSON.stringify(updatedUsers));
  }
  
  localStorage.removeItem("dsaLoggedInUser");
  localStorage.setItem("dsaLoggedIn", "false");
  localStorage.removeItem("currentUserName");
  
  window.location.href = "../../index.html";
}