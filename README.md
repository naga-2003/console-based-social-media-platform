# 🌐 Console-Based Social Media Platform

A feature-rich, console-based social media application built with Node.js that implements a complete social networking experience with user authentication, connections, posts, and interactions.

![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [Feature Walkthrough](#-feature-walkthrough)
- [Data Structure](#-data-structure)
- [Technical Details](#-technical-details)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### Authentication & User Management
- ✅ User registration with profile details
- ✅ Secure login/logout system
- ✅ Single session management
- ✅ Email uniqueness validation
- ✅ User profile viewer

### Social Connections (Twitter/Instagram Style)
- ✅ One-directional follow system
- ✅ Send friend requests
- ✅ Accept/reject friend requests
- ✅ View friends with detailed profiles
- ✅ Unfriend/unfollow functionality
- ✅ Find mutual friends
- ✅ Online/offline status indicators

### Content & Interactions
- ✅ Create posts
- ✅ Chronological news feed
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ View post details
- ✅ Real-time engagement metrics

### Platform Analytics
- ✅ View all registered users
- ✅ Platform-wide statistics
- ✅ JSON data export
- ✅ User activity tracking
- ✅ Recent posts preview

### Data Management
- ✅ Local storage persistence
- ✅ Clear all data option
- ✅ Data validation
- ✅ Error handling

---

## 🏗️ System Architecture

### One-Directional Friendship Model

This platform uses a **one-directional** (asymmetric) friendship model, similar to Twitter or Instagram:

```
User A sends request → User B accepts → User A follows User B
                                       (User B does NOT automatically follow User A)

For mutual connection:
User B must also send request → User A accepts → Now they follow each other
```

**Key Concepts:**
- **Followers**: Users who follow you
- **Following**: Users you follow
- **Mutual**: When both users follow each other
- **One-way**: When only one user follows the other

---

## 📥 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd social-media-platform
   ```

2. **Install dependencies**
   ```bash
   npm install node-localstorage
   ```

3. **Run the application**
   ```bash
   node social-media-improved.js
   ```

---

## 💻 Usage

### Starting the Application

```bash
node social-media-improved.js
```

### Main Menu

```
===================================
      SOCIAL MEDIA PLATFORM      
===================================
1. Sign Up
2. Log In
3. Log Out
4. Send Friend Request
5. Accept Friend Request
6. View Friends
7. Unfriend Someone
8. Create Post
9. View Feeds
10. Like/Comment on Posts
11. Find Mutual Friends
12. View Current User Details
13. View All Users
14. View All Users (JSON)
15. Clear All Data
16. Exit
===================================
```

---

## 🎯 Feature Walkthrough

### 1️⃣ Sign Up (Option 1)

Create a new account with:
- Name
- Date of Birth
- Email (must be unique)
- Location
- Occupation

```
Example:
Name: John Doe
DOB: 15/05/1995
Email: john@email.com
Location: New York
Occupation: Software Developer
```

### 2️⃣ Log In (Option 2)

Login with your registered email and name.

```
Email: john@email.com
Name: John Doe
```

### 3️⃣ Log Out (Option 3)

Safely logout from the current session.

### 4️⃣ Send Friend Request (Option 4)

Send a follow request to another user by their name.

**Validations:**
- ✓ User must exist
- ✓ Cannot send request to yourself
- ✓ Cannot send if already sent
- ✓ Cannot send if they already sent you one
- ✓ Prevents sending to mutual followers

### 5️⃣ Accept Friend Request (Option 5)

View and accept incoming friend requests.

**Options:**
- Accept All: Accept all pending requests at once
- Accept Specific: Choose which request to accept
- Cancel: Go back to main menu

**Result:** One-directional follow is created
- You get them as a follower
- They follow you

### 6️⃣ View Friends (Option 6)

See all your connections with detailed information:
- Name, Email, DOB
- Location, Occupation
- Total Posts
- Online/Offline Status
- Friendship Type (Mutual ✓ or One-way ⚠)

### 7️⃣ Unfriend Someone (Option 7)

Remove a connection with any user.

**Shows:**
- Current connection status
- Who follows whom
- Confirmation prompt

**Result:** Removes connection in both directions

### 8️⃣ Create Post (Option 8)

Share your thoughts with the platform.

**Features:**
- Validates non-empty content
- Automatic timestamp
- Engagement tracking (likes, comments)

### 9️⃣ View Feeds (Option 9)

See all posts from all users, sorted chronologically (newest first).

**Displays:**
- Post ID and Author
- Content
- Timestamp
- Likes count (shows if you liked it)
- Comments count
- All comments with usernames

### 🔟 Like/Comment on Posts (Option 10)

Interact with posts in multiple ways:

**1. Like a Post**
- Enter post ID to like/unlike
- Toggle functionality (like again to unlike)

**2. Comment on a Post**
- Enter post ID
- Add your comment
- Shows with your username and timestamp

**3. View Post Details**
- See full post information
- Read all comments
- Check engagement metrics

### 1️⃣1️⃣ Find Mutual Friends (Option 11)

Discover common connections with another user.

**Features:**
- Enter user name or ID
- Shows count of mutual friends
- Lists all mutual connections with details
- Prevents self-comparison

### 1️⃣2️⃣ View Current User Details (Option 12)

See your complete profile:
- Personal information
- Statistics (posts, followers, following)
- Pending requests (sent & received)
- Full JSON export of your data

### 1️⃣3️⃣ View All Users (Option 13)

Browse all registered users with comprehensive information:

**For Each User:**
- Profile details
- Online/Offline status (🟢/⚫)
- Complete statistics
- Recent posts preview (last 3)
- Engagement metrics

**Platform Statistics:**
- Total users
- Online/Offline count
- Total posts
- Total friendships

### 1️⃣4️⃣ View All Users (JSON) (Option 14)

Developer-friendly view:
- Quick user summary
- Complete JSON dump
- Raw data structure
- Perfect for debugging or backup

### 1️⃣5️⃣ Clear All Data (Option 15)

Reset the entire database.

**Safety Features:**
- Warning message
- Must type "DELETE" to confirm
- Permanently removes all data
- Allows fresh start

### 1️⃣6️⃣ Exit (Option 16)

Safely exit the application.

---

## 📊 Data Structure

### User Object

```javascript
{
  "id": 123456,                    // Unique user ID
  "name": "John Doe",              // Full name
  "dob": "15/05/1995",             // Date of birth
  "email": "john@email.com",       // Email (unique)
  "location": "New York",          // Location
  "occupation": "Developer",       // Occupation
  "loginStatus": false,            // Currently logged in?
  "followers": [234567],           // IDs of users who follow you
  "following": [345678],           // IDs of users you follow
  "friendRequests": {
    "sent": [456789],              // Requests you sent
    "received": [567890]           // Requests you received
  },
  "posts": {
    "totalPosts": 5,               // Post count
    "postList": [                  // Array of posts
      {
        "id": 12345,               // Post ID
        "name": "John Doe",        // Author name
        "userId": 123456,          // Author ID
        "content": "Hello World!", // Post content
        "timestamp": 1738407600000,// Unix timestamp
        "likes": [234567],         // IDs who liked
        "comments": [              // Comment objects
          {
            "comment": "Nice!",
            "userId": 234567,
            "userName": "Jane",
            "timestamp": 1738408200000
          }
        ]
      }
    ]
  }
}
```

### Storage Location

```
project-folder/
└── newspaper/
    └── userDetails    (JSON file with all user data)
```

---

## 🔧 Technical Details

### Technology Stack

- **Runtime**: Node.js
- **Language**: JavaScript (ES6+)
- **Storage**: LocalStorage (node-localstorage)
- **I/O**: Readline (built-in)

### Key Features

**Architecture:**
- Modular function design
- Single responsibility principle
- Clear separation of concerns

**Data Management:**
- Local file-based persistence
- JSON data format
- Automatic data synchronization

**Security:**
- Email uniqueness validation
- Login status management
- Data integrity checks

**Error Handling:**
- Input validation
- Null safety checks
- User-friendly error messages

### Code Highlights

```javascript
// Reusable current user getter
function getCurrentUser() {
  const details = JSON.parse(localStorage.getItem("userDetails")) || [];
  return details.find((u) => u.loginStatus === true);
}

// Smart friend request validation
const youFollowThem = currentUser.following.includes(friendUser.id);
const theyFollowYou = currentUser.followers.includes(friendUser.id);

// One-directional follow creation
currentUser.followers.push(friendId);
friendUser.following.push(currentUser.id);
```

---

## 📸 Screenshots

### Main Menu
```
===================================
      SOCIAL MEDIA PLATFORM      
===================================
Welcome back, John!
===================================
```

### User Profile
```
===================================
    CURRENT USER DETAILS
===================================
Name: John Doe
Email: john@email.com
Total Posts: 5
Followers: 3
Following: 2
===================================
```

### News Feed
```
===================================
           NEWS FEED
===================================

[Post #1] ID: 12345
Author: Jane Smith
Content: Just launched my new project!
Posted: 2/1/2026, 10:30:45 AM
Likes: 3 (You liked this)
Comments: 1
-----------------------------------
```

### Platform Statistics
```
📊 PLATFORM STATISTICS:
===================================
Total Users: 50
Online Users: 12
Offline Users: 38
Total Posts: 234
Total Friendships: 78
===================================
```

---

## 🔍 Troubleshooting

### Common Issues

**1. "Cannot find module 'node-localstorage'"**
```bash
Solution: npm install node-localstorage
```

**2. "Permission denied" when accessing data**
```bash
Solution (Linux/Mac): sudo chmod 755 newspaper
Solution (Windows): Run as Administrator
```

**3. Data persists after clearing**
```bash
Solution: Delete the newspaper folder manually
rm -rf newspaper  # Linux/Mac
rmdir /s newspaper  # Windows
```

**4. Duplicate IDs in arrays**
```bash
Solution: This is now fixed in the latest version
Use Option 15 to clear data and start fresh
```

**5. Login fails with correct credentials**
```bash
Solution: Check exact name and email spelling
Case-sensitive comparison
```

---

## 🚀 Future Enhancements

### Planned Features

**Phase 1: Enhanced Security**
- [ ] Password authentication
- [ ] Password hashing (bcrypt)
- [ ] Session tokens
- [ ] Password reset functionality

**Phase 2: Advanced Features**
- [ ] Direct messaging
- [ ] Post editing/deletion
- [ ] Image uploads
- [ ] Hashtags and mentions
- [ ] User search functionality
- [ ] Block/mute users

**Phase 3: Data & Analytics**
- [ ] User activity logs
- [ ] Trending posts
- [ ] Recommendation system
- [ ] Export data to CSV/JSON
- [ ] Data backup automation

**Phase 4: UI Improvements**
- [ ] Colored console output
- [ ] Progress bars
- [ ] ASCII art headers
- [ ] Better formatting

**Phase 5: Migration**
- [ ] MongoDB integration
- [ ] REST API backend
- [ ] Web frontend (React)
- [ ] Mobile app support

---

## 🎓 Learning Outcomes

This project demonstrates:

✅ **JavaScript Fundamentals**
- Arrays, Objects, Functions
- ES6+ features (arrow functions, destructuring)
- Asynchronous operations

✅ **Data Structures**
- Graph-like relationships (followers/following)
- Arrays for lists
- Objects for records

✅ **Algorithms**
- Sorting (chronological posts)
- Filtering (mutual friends)
- Searching (user lookup)
- Validation logic

✅ **Software Design**
- Modular architecture
- Function reusability
- Error handling
- Data persistence

✅ **User Experience**
- Menu-driven interface
- Clear feedback messages
- Input validation
- Confirmation prompts

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check if the issue already exists
2. Create a detailed bug report
3. Include steps to reproduce
4. Provide error messages/screenshots

### Suggesting Features
1. Explain the use case
2. Describe the expected behavior
3. Provide examples if possible

### Code Contributions
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code structure
- Maintain consistency

---

---

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@naga-2003](https://github.com/naga-2003)
- LinkedIn: [Nagarajan M](https://www.linkedin.com/in/mnaga-js/)
- Email: mnagarajan1220@gmail.com

---

## 🙏 Acknowledgments

- Node.js community for excellent documentation
- LocalStorage package maintainers
- All contributors and testers

---

## 🎯 Project Stats

- **Lines of Code**: ~650
- **Functions**: 16 main functions
- **Features**: 16 distinct functionalities
- **Dependencies**: 1 (node-localstorage)
- **Estimated Time**: 40+ hours of development

---

## 📚 Additional Resources

### Documentation
- [Feature Showcase](FEATURE_SHOWCASE.md) - Detailed feature explanations
- [Data Management Guide](DATA_MANAGEMENT_GUIDE.md) - Backup and restore
- [Friendship Workflow](FRIENDSHIP_WORKFLOW_GUIDE.md) - Understanding connections
- [Code Review](CODE_REVIEW.md) - Improvements and fixes
- [Quick Reference](QUICK_REFERENCE.md) - Quick start guide

### Related Projects
- Twitter Clone
- Instagram Clone
- Facebook Clone
- Social Network Analysis

---

## 🌟 Star This Repository

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ using Node.js**

Last Updated: February 2026
Version: 2.0.0
