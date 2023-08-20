const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the homepage after successful logout
      document.location.replace('/');
    } else {
      // Display an error message if logout fails
      alert('Logout failed. Please try again.');
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

// Attach the logout function to the click event of the logout button
document.querySelector('#logout').addEventListener('click', logout);
