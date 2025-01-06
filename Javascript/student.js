document.addEventListener('DOMContentLoaded', () => {
    // Profile dropdown functionality
    const profilePic = document.querySelector('.profile-pic');
    const arrowButton = document.querySelector('.arrow-button');
    const profileDropdown = document.querySelector('.profile-dropdown');
  
    const toggleProfileDropdown = () => {
      profileDropdown.style.display = 
        profileDropdown.style.display === 'block' ? 'none' : 'block';
    };
  
    profilePic.addEventListener('click', toggleProfileDropdown);
    arrowButton.addEventListener('click', toggleProfileDropdown);
  
    // Chatbot modal functionality
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotModal = document.querySelector('.chatbot-modal');
  
    chatbotIcon.addEventListener('click', () => {
      chatbotModal.style.display = 
        chatbotModal.style.display === 'block' ? 'none' : 'block';
    });
  
    // Close the profile dropdown if clicked outside
    document.addEventListener('click', (event) => {
      if (!profileDropdown.contains(event.target) && 
          !profilePic.contains(event.target) && 
          !arrowButton.contains(event.target)) {
        profileDropdown.style.display = 'none';
      }
    });
  });