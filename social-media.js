const readline = require("readline");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./newspaper");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Initialize storage
let storedDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

// Find current logged-in user
function getCurrentUser() {
  const details = JSON.parse(localStorage.getItem("userDetails")) || [];
  return details.find((u) => u.loginStatus === true);
}

// Main Menu
function showMainMenu() {
  const currentUser = getCurrentUser();
  
  console.log("\n===================================");
  console.log("      SOCIAL MEDIA PLATFORM      ");
  console.log("===================================");
  
  if (currentUser) {
    console.log(`Welcome back, ${currentUser.name}!`);
  } else {
    console.log("Sign up to connect with friends and the world around you.");
  }
  
  console.log("===================================");
  console.log("1. Sign Up");
  console.log("2. Log In");
  console.log("3. Log Out");
  console.log("4. Send Friend Request");
  console.log("5. Accept Friend Request");
  console.log("6. View Friends");
  console.log("7. Unfriend Someone");
  console.log("8. Create Post");
  console.log("9. View Feeds");
  console.log("10. Like/Comment on Posts");
  console.log("11. Find Mutual Friends");
  console.log("12. View Current User Details");
  console.log("13. View All Users");
  console.log("14. View All Users (JSON)");
  console.log("15. Clear All Data");
  console.log("16. Exit");
  console.log("===================================");
  
  rl.question("Choose an option (1-16): ", handleMenuChoice);
}

// Handle menu selection
function handleMenuChoice(choice) {
  const currentUser = getCurrentUser();
  
  switch (choice) {
    case "1":
      signUp();
      break;
    case "2":
      logIn();
      break;
    case "3":
      logOut();
      break;
    case "4":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        sendFriendRequest();
      }
      break;
    case "5":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        acceptFriendRequest();
      }
      break;
    case "6":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        displayFriends();
      }
      break;
    case "7":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        unfriendUser();
      }
      break;
    case "8":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        createPost();
      }
      break;
    case "9":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        viewFeeds();
      }
      break;
    case "10":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        likesComments();
      }
      break;
    case "11":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        findMutualFriends();
      }
      break;
    case "12":
      if (!currentUser) {
        console.log("Please log in first.");
        rl.close();
      } else {
        viewCurrentUserDetails();
      }
      break;
    case "13":
      viewAllUsersSimple();
      break;
    case "14":
      viewAllUsersJSON();
      break;
    case "15":
      clearAllData();
      break;
    case "16":
      console.log("\nThank you for using our Social Media Platform!");
      rl.close();
      break;
    default:
      console.log("Invalid option! Please choose a valid option (1-16).");
      rl.close();
  }
}

// Sign Up Function
function signUp() {
  console.log("\n===================================");
  console.log("           SIGN UP");
  console.log("===================================");
  
  rl.question("Enter your name: ", function (name) {
    rl.question("Enter your date of birth (DD/MM/YYYY): ", function (dob) {
      rl.question("Enter your email: ", function (email) {
        rl.question("Enter your location: ", function (location) {
          rl.question("Enter your occupation: ", function (occupation) {
            let details = JSON.parse(localStorage.getItem("userDetails") || "[]");
            
            // Check if email already exists
            const emailExists = details.some(user => user.email === email);
            if (emailExists) {
              console.log("Email already registered! Please log in.");
              rl.close();
              return;
            }
            
            const newUser = {
              id: Math.floor(Math.random() * 1000000),
              name,
              dob,
              email,
              location,
              occupation,
              loginStatus: false,
              followers: [],
              following: [],
              friendRequests: { sent: [], received: [] },
              posts: { totalPosts: 0, postList: [] },
            };
            
            details.push(newUser);
            localStorage.setItem("userDetails", JSON.stringify(details));
            
            console.log("\n✓ Account created successfully!");
            console.log("You can now log in with your credentials.");
            rl.close();
          });
        });
      });
    });
  });
}

// Log In Function
function logIn() {
  console.log("\n===================================");
  console.log("           LOG IN");
  console.log("===================================");
  
  rl.question("Enter your email: ", function (email) {
    rl.question("Enter your name: ", function (name) {
      let storedDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
      
      const user = storedDetails.find(
        (u) => u.name === name && u.email === email
      );
      
      if (user) {
        // Log out any other user first
        storedDetails.forEach(u => u.loginStatus = false);
        
        // Log in current user
        user.loginStatus = true;
        localStorage.setItem("userDetails", JSON.stringify(storedDetails));
        
        console.log("\n✓ Login successful!");
        console.log(`Welcome back, ${name}!`);
        rl.close();
      } else {
        console.log("\n✗ Login failed! Please check your credentials.");
        rl.close();
      }
    });
  });
}

// Log Out Function
function logOut() {
  let storedDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  if (!currentUser) {
    console.log("No user is currently logged in.");
    rl.close();
    return;
  }
  
  currentUser.loginStatus = false;
  localStorage.setItem("userDetails", JSON.stringify(storedDetails));
  
  console.log("\n✓ Logout successful!");
  rl.close();
}

// Send Friend Request
function sendFriendRequest() {
  const currentUser = getCurrentUser();
  
  rl.question("Enter the name of the person you want to send a friend request to: ", function (friendName) {
    let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
    
    if (currentUser.name === friendName) {
      console.log("You cannot send a friend request to yourself!");
      rl.close();
      return;
    }
    
    const friendUser = storedDetails.find((u) => u.name === friendName);
    
    if (!friendUser) {
      console.log(`User "${friendName}" not found!`);
      rl.close();
      return;
    }
    
    // Check if already connected (one-directional check)
    // Allow sending request even if one-way connection exists
    const youFollowThem = currentUser.following.includes(friendUser.id);
    const theyFollowYou = currentUser.followers.includes(friendUser.id);
    
    // Only block if BOTH directions exist (mutual followers)
    if (youFollowThem && theyFollowYou) {
      console.log(`\n✗ You and ${friendName} already follow each other!`);
      console.log(`Use option 7 to unfriend if you want to change the connection.`);
      rl.close();
      return;
    }
    
    // Check if request already sent
    if (currentUser.friendRequests.sent.includes(friendUser.id)) {
      console.log(`Friend request already sent to ${friendName}!`);
      rl.close();
      return;
    }
    
    // Check if they already sent you a request
    if (currentUser.friendRequests.received.includes(friendUser.id)) {
      console.log(`${friendName} has already sent you a friend request!`);
      console.log(`Please accept their request from option 5.`);
      rl.close();
      return;
    }
    
    // Update current user in the array
    const currentUserInArray = storedDetails.find(u => u.id === currentUser.id);
    currentUserInArray.friendRequests.sent.push(friendUser.id);
    friendUser.friendRequests.received.push(currentUser.id);
    
    localStorage.setItem("userDetails", JSON.stringify(storedDetails));
    console.log(`\n✓ Friend request sent to ${friendName}!`);
    rl.close();
  });
}

// Accept Friend Request
function acceptFriendRequest() {
  let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  if (currentUser.friendRequests.received.length === 0) {
    console.log("You have no pending friend requests.");
    rl.close();
    return;
  }
  
  console.log("\n===================================");
  console.log("      FRIEND REQUESTS");
  console.log("===================================");
  
  // Display friend requests with names
  currentUser.friendRequests.received.forEach((friendId, index) => {
    const friend = storedDetails.find((u) => u.id === friendId);
    if (friend) {
      console.log(`${index + 1}. ${friend.name} (${friend.email})`);
    }
  });
  
  console.log("===================================");
  console.log("1. Accept All");
  console.log("2. Accept Specific");
  console.log("3. Cancel");
  
  rl.question("Choose an option (1-3): ", function (option) {
    if (option === "1") {
      // Accept all friend requests
      currentUser.friendRequests.received.forEach((friendId) => {
        const friendUser = storedDetails.find((u) => u.id === friendId);
        if (friendUser) {
          // Original logic: ONE-DIRECTIONAL
          // Current user gets them as follower
          // Friend user gets current user as following
          if (!currentUser.followers.includes(friendId)) {
            currentUser.followers.push(friendId);
          }
          if (!friendUser.following.includes(currentUser.id)) {
            friendUser.following.push(currentUser.id);
          }
          
          // Remove from friend requests
          friendUser.friendRequests.sent = friendUser.friendRequests.sent.filter(
            (id) => id !== currentUser.id
          );
        }
      });
      
      currentUser.friendRequests.received = [];
      localStorage.setItem("userDetails", JSON.stringify(storedDetails));
      console.log("\n✓ All friend requests accepted!");
      rl.close();
    } else if (option === "2") {
      rl.question("Enter the name of the friend to accept: ", function (friendName) {
        const friendUser = storedDetails.find((u) => u.name === friendName);
        
        if (friendUser && currentUser.friendRequests.received.includes(friendUser.id)) {
          // Original logic: ONE-DIRECTIONAL
          // Current user gets them as follower
          // Friend user gets current user as following
          if (!currentUser.followers.includes(friendUser.id)) {
            currentUser.followers.push(friendUser.id);
          }
          if (!friendUser.following.includes(currentUser.id)) {
            friendUser.following.push(currentUser.id);
          }
          
          // Remove from friend requests
          currentUser.friendRequests.received = currentUser.friendRequests.received.filter(
            (id) => id !== friendUser.id
          );
          friendUser.friendRequests.sent = friendUser.friendRequests.sent.filter(
            (id) => id !== currentUser.id
          );
          
          localStorage.setItem("userDetails", JSON.stringify(storedDetails));
          console.log(`\n✓ Friend request from ${friendName} accepted!`);
        } else {
          console.log(`No friend request from "${friendName}" found!`);
        }
        rl.close();
      });
    } else {
      console.log("Cancelled.");
      rl.close();
    }
  });
}

// Display Friends
function displayFriends() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  const allFriends = [...new Set([...currentUser.followers, ...currentUser.following])];
  
  if (allFriends.length === 0) {
    console.log("\nYou have no friends yet. Start connecting!");
    rl.close();
    return;
  }
  
  console.log("\n===================================");
  console.log(`      YOUR FRIENDS (${allFriends.length})      `);
  console.log("===================================");
  
  allFriends.forEach((friendId, index) => {
    const friend = storedDetails.find((u) => u.id === friendId);
    if (friend) {
      const status = friend.loginStatus ? "🟢 ONLINE" : "⚫ OFFLINE";
      const isMutual = currentUser.followers.includes(friendId) && currentUser.following.includes(friendId);
      
      console.log(`\n${index + 1}. ${friend.name} - ${status}`);
      console.log(`   Email: ${friend.email}`);
      console.log(`   DOB: ${friend.dob}`);
      console.log(`   Location: ${friend.location}`);
      console.log(`   Occupation: ${friend.occupation}`);
      console.log(`   User ID: ${friend.id}`);
      console.log(`   Posts: ${friend.posts.totalPosts}`);
      console.log(`   Friendship: ${isMutual ? '✓ Mutual Friends' : '⚠ One-way Connection'}`);
    }
  });
  
  console.log("===================================");
  console.log("\n💡 Tip: Use option 7 to unfriend someone");
  rl.close();
}

// Unfriend Someone
function unfriendUser() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  const allFriends = [...new Set([...currentUser.followers, ...currentUser.following])];
  
  if (allFriends.length === 0) {
    console.log("\nYou have no friends to unfriend.");
    rl.close();
    return;
  }
  
  console.log("\n===================================");
  console.log("      UNFRIEND A FRIEND");
  console.log("===================================");
  console.log("Your current friends:");
  
  allFriends.forEach((friendId, index) => {
    const friend = storedDetails.find((u) => u.id === friendId);
    if (friend) {
      console.log(`${index + 1}. ${friend.name} (${friend.email})`);
    }
  });
  
  console.log("===================================");
  
  rl.question("Enter the name of the friend to unfriend: ", function (friendName) {
    const friendUser = storedDetails.find((u) => u.name === friendName);
    
    if (!friendUser) {
      console.log(`User "${friendName}" not found!`);
      rl.close();
      return;
    }
    
    // Check if there's any connection
    const youFollowThem = currentUser.following.includes(friendUser.id);
    const theyFollowYou = currentUser.followers.includes(friendUser.id);
    
    if (!youFollowThem && !theyFollowYou) {
      console.log(`You have no connection with ${friendName}!`);
      rl.close();
      return;
    }
    
    // Show current connection status
    console.log(`\nCurrent connection status:`);
    console.log(`  You follow ${friendName}: ${youFollowThem ? '✓ Yes' : '✗ No'}`);
    console.log(`  ${friendName} follows you: ${theyFollowYou ? '✓ Yes' : '✗ No'}`);
    
    // Confirm unfriend
    rl.question(`\nAre you sure you want to remove this connection? (yes/no): `, function (confirm) {
      if (confirm.toLowerCase() === "yes" || confirm.toLowerCase() === "y") {
        // Remove from both users' followers and following arrays
        currentUser.followers = currentUser.followers.filter(id => id !== friendUser.id);
        currentUser.following = currentUser.following.filter(id => id !== friendUser.id);
        
        friendUser.followers = friendUser.followers.filter(id => id !== currentUser.id);
        friendUser.following = friendUser.following.filter(id => id !== currentUser.id);
        
        localStorage.setItem("userDetails", JSON.stringify(storedDetails));
        
        console.log(`\n✓ Connection removed with ${friendName}.`);
        console.log(`You can send them a new friend request if you want to reconnect.`);
      } else {
        console.log("\nUnfriend cancelled.");
      }
      rl.close();
    });
  });
}

// Create Post
function createPost() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  console.log("\n===================================");
  console.log("        CREATE NEW POST");
  console.log("===================================");
  
  rl.question("Enter your post content: ", function (content) {
    if (!content.trim()) {
      console.log("Post content cannot be empty!");
      rl.close();
      return;
    }
    
    const post = {
      id: Math.floor(Math.random() * 100000),
      name: currentUser.name,
      userId: currentUser.id,
      content: content.trim(),
      timestamp: new Date().getTime(),
      likes: [],
      comments: [],
    };
    
    currentUser.posts.postList.push(post);
    currentUser.posts.totalPosts++;
    localStorage.setItem("userDetails", JSON.stringify(storedDetails));
    
    console.log("\n✓ Post created successfully!");
    rl.close();
  });
}

// View Feeds
function viewFeeds() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  // Get all posts from all users
  const allPosts = [];
  storedDetails.forEach((user) => {
    user.posts.postList.forEach((post) => {
      allPosts.push(post);
    });
  });
  
  if (allPosts.length === 0) {
    console.log("\nNo posts available yet. Be the first to post!");
    rl.close();
    return;
  }
  
  // Sort by timestamp (newest first)
  const sortedPosts = allPosts.sort((a, b) => b.timestamp - a.timestamp);
  
  console.log("\n===================================");
  console.log("           NEWS FEED");
  console.log("===================================");
  
  sortedPosts.forEach((post, index) => {
    const hasLiked = post.likes.includes(currentUser.id);
    
    console.log(`\n[Post #${index + 1}] ID: ${post.id}`);
    console.log(`Author: ${post.name}`);
    console.log(`Content: ${post.content}`);
    console.log(`Posted: ${new Date(post.timestamp).toLocaleString()}`);
    console.log(`Likes: ${post.likes.length} ${hasLiked ? '(You liked this)' : ''}`);
    console.log(`Comments: ${post.comments.length}`);
    
    // Show comments
    if (post.comments.length > 0) {
      console.log("\nComments:");
      post.comments.forEach((comment, idx) => {
        console.log(`  ${idx + 1}. ${comment.userName}: ${comment.comment}`);
      });
    }
    console.log("-----------------------------------");
  });
  
  rl.close();
}

// Like and Comment on Posts
function likesComments() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  console.log("\n===================================");
  console.log("    INTERACT WITH POSTS");
  console.log("===================================");
  console.log("1. Like a post");
  console.log("2. Comment on a post");
  console.log("3. View post details");
  console.log("4. Cancel");
  
  rl.question("Choose an option (1-4): ", function (option) {
    if (option === "1") {
      rl.question("Enter the post ID to like: ", function (id) {
        const numId = parseInt(id);
        let postFound = false;
        
        storedDetails.forEach((user) => {
          user.posts.postList.forEach((post) => {
            if (post.id === numId) {
              postFound = true;
              
              if (post.likes.includes(currentUser.id)) {
                // Unlike the post
                post.likes = post.likes.filter(userId => userId !== currentUser.id);
                console.log("\n✓ Post unliked!");
              } else {
                // Like the post
                post.likes.push(currentUser.id);
                console.log("\n✓ Post liked successfully!");
              }
              
              localStorage.setItem("userDetails", JSON.stringify(storedDetails));
            }
          });
        });
        
        if (!postFound) {
          console.log("Post not found!");
        }
        rl.close();
      });
    } else if (option === "2") {
      rl.question("Enter the post ID to comment: ", function (id) {
        const numId = parseInt(id);
        let postFound = false;
        
        storedDetails.forEach((user) => {
          user.posts.postList.forEach((post) => {
            if (post.id === numId) {
              postFound = true;
              
              rl.question("Enter your comment: ", function (commentText) {
                if (!commentText.trim()) {
                  console.log("Comment cannot be empty!");
                  rl.close();
                  return;
                }
                
                const comment = {
                  comment: commentText.trim(),
                  userId: currentUser.id,
                  userName: currentUser.name,
                  timestamp: new Date().getTime(),
                };
                
                post.comments.push(comment);
                localStorage.setItem("userDetails", JSON.stringify(storedDetails));
                
                console.log("\n✓ Comment added successfully!");
                rl.close();
              });
            }
          });
        });
        
        if (!postFound) {
          console.log("Post not found!");
          rl.close();
        }
      });
    } else if (option === "3") {
      rl.question("Enter the post ID to view: ", function (id) {
        const numId = parseInt(id);
        let postFound = false;
        
        storedDetails.forEach((user) => {
          user.posts.postList.forEach((post) => {
            if (post.id === numId) {
              postFound = true;
              
              console.log("\n===================================");
              console.log(`Post by: ${post.name}`);
              console.log(`Content: ${post.content}`);
              console.log(`Posted: ${new Date(post.timestamp).toLocaleString()}`);
              console.log(`Likes: ${post.likes.length}`);
              console.log(`Comments: ${post.comments.length}`);
              
              if (post.comments.length > 0) {
                console.log("\nComments:");
                post.comments.forEach((comment, idx) => {
                  console.log(`${idx + 1}. ${comment.userName}: ${comment.comment}`);
                  console.log(`   ${new Date(comment.timestamp).toLocaleString()}`);
                });
              }
              console.log("===================================");
            }
          });
        });
        
        if (!postFound) {
          console.log("Post not found!");
        }
        rl.close();
      });
    } else {
      console.log("Cancelled.");
      rl.close();
    }
  });
}

// Find Mutual Friends
function findMutualFriends() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  rl.question("Enter the name or ID of the user: ", function (input) {
    const friendUser = storedDetails.find(
      (u) => u.id == input || u.name === input
    );
    
    if (!friendUser) {
      console.log("User not found.");
      rl.close();
      return;
    }
    
    if (friendUser.id === currentUser.id) {
      console.log("You cannot find mutual friends with yourself!");
      rl.close();
      return;
    }
    
    const currentUserFriends = [...new Set([
      ...currentUser.followers,
      ...currentUser.following,
    ])];
    
    const friendUserFriends = [...new Set([
      ...friendUser.followers,
      ...friendUser.following,
    ])];
    
    const mutualFriends = currentUserFriends.filter((friendId) =>
      friendUserFriends.includes(friendId)
    );
    
    console.log("\n===================================");
    console.log(`  MUTUAL FRIENDS WITH ${friendUser.name}`);
    console.log("===================================");
    
    if (mutualFriends.length === 0) {
      console.log("No mutual friends found.");
    } else {
      console.log(`You have ${mutualFriends.length} mutual friend(s):\n`);
      
      mutualFriends.forEach((friendId, index) => {
        const mutual = storedDetails.find((user) => user.id === friendId);
        if (mutual) {
          console.log(`${index + 1}. ${mutual.name} (${mutual.email})`);
        }
      });
    }
    
    console.log("===================================");
    rl.close();
  });
}

// View Current User Details
function viewCurrentUserDetails() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  const currentUser = storedDetails.find((u) => u.loginStatus === true);
  
  console.log("\n===================================");
  console.log("    CURRENT USER DETAILS");
  console.log("===================================");
  console.log(`Name: ${currentUser.name}`);
  console.log(`Email: ${currentUser.email}`);
  console.log(`DOB: ${currentUser.dob}`);
  console.log(`Location: ${currentUser.location}`);
  console.log(`Occupation: ${currentUser.occupation}`);
  console.log(`User ID: ${currentUser.id}`);
  console.log(`Total Posts: ${currentUser.posts.totalPosts}`);
  console.log(`Followers: ${currentUser.followers.length}`);
  console.log(`Following: ${currentUser.following.length}`);
  console.log(`Pending Friend Requests: ${currentUser.friendRequests.received.length}`);
  console.log(`Sent Friend Requests: ${currentUser.friendRequests.sent.length}`);
  console.log("===================================");
  
  console.log("\n📊 CURRENT USER JSON:");
  console.log(JSON.stringify(currentUser, null, 2));
  console.log("===================================");
  
  rl.close();
}

// View All Users (Simple Display)
function viewAllUsersSimple() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  
  if (storedDetails.length === 0) {
    console.log("\nNo users registered yet.");
    rl.close();
    return;
  }
  
  console.log("\n===================================");
  console.log(`    ALL REGISTERED USERS (${storedDetails.length})    `);
  console.log("===================================");
  
  storedDetails.forEach((user, index) => {
    const status = user.loginStatus ? "🟢 ONLINE" : "⚫ OFFLINE";
    const allFriends = [...new Set([...user.followers, ...user.following])];
    
    console.log(`\n${index + 1}. ${user.name} - ${status}`);
    console.log("-----------------------------------");
    console.log(`   Email: ${user.email}`);
    console.log(`   DOB: ${user.dob}`);
    console.log(`   Location: ${user.location}`);
    console.log(`   Occupation: ${user.occupation}`);
    console.log(`   User ID: ${user.id}`);
    console.log("   ───────────────────────────────");
    console.log(`   📊 Statistics:`);
    console.log(`      • Total Posts: ${user.posts.totalPosts}`);
    console.log(`      • Total Friends: ${allFriends.length}`);
    console.log(`      • Followers: ${user.followers.length}`);
    console.log(`      • Following: ${user.following.length}`);
    console.log(`      • Pending Requests: ${user.friendRequests.received.length}`);
    console.log(`      • Sent Requests: ${user.friendRequests.sent.length}`);
    
    // Show recent posts
    if (user.posts.postList.length > 0) {
      console.log(`   ───────────────────────────────`);
      console.log(`   📝 Recent Posts:`);
      const recentPosts = user.posts.postList.slice(-3).reverse();
      recentPosts.forEach((post, idx) => {
        console.log(`      ${idx + 1}. "${post.content.substring(0, 50)}${post.content.length > 50 ? '...' : ''}"`);
        console.log(`         Likes: ${post.likes.length} | Comments: ${post.comments.length}`);
      });
    }
    
    console.log("===================================");
  });
  
  // Summary statistics
  const totalPosts = storedDetails.reduce((sum, user) => sum + user.posts.totalPosts, 0);
  const totalFriendships = storedDetails.reduce((sum, user) => {
    const friends = [...new Set([...user.followers, ...user.following])];
    return sum + friends.length;
  }, 0) / 2; // Divide by 2 because each friendship is counted twice
  const onlineUsers = storedDetails.filter(u => u.loginStatus).length;
  
  console.log("\n📊 PLATFORM STATISTICS:");
  console.log("===================================");
  console.log(`Total Users: ${storedDetails.length}`);
  console.log(`Online Users: ${onlineUsers}`);
  console.log(`Offline Users: ${storedDetails.length - onlineUsers}`);
  console.log(`Total Posts: ${totalPosts}`);
  console.log(`Total Friendships: ${Math.floor(totalFriendships)}`);
  console.log("===================================");
  
  rl.close();
}

// View All Users (JSON)
function viewAllUsersJSON() {
  const storedDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  
  if (storedDetails.length === 0) {
    console.log("\nNo users registered yet.");
    rl.close();
    return;
  }
  
  console.log("\n===================================");
  console.log(`    ALL USERS (${storedDetails.length})    `);
  console.log("===================================");
  
  storedDetails.forEach((user, index) => {
    const status = user.loginStatus ? "🟢 ONLINE" : "⚫ OFFLINE";
    console.log(`\n${index + 1}. ${user.name} - ${status}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Posts: ${user.posts.totalPosts}`);
    console.log(`   Followers: ${user.followers.length} | Following: ${user.following.length}`);
  });
  
  console.log("\n===================================");
  console.log("📊 ALL USERS JSON:");
  console.log("===================================");
  console.log(JSON.stringify(storedDetails, null, 2));
  console.log("===================================");
  
  rl.close();
}

// Clear All Data
function clearAllData() {
  console.log("\n===================================");
  console.log("⚠️  CLEAR ALL DATA WARNING");
  console.log("===================================");
  console.log("This will permanently delete:");
  console.log("- All user accounts");
  console.log("- All posts");
  console.log("- All friend connections");
  console.log("- All data in the database");
  console.log("===================================");
  
  rl.question("Are you sure? Type 'DELETE' to confirm: ", function (confirmation) {
    if (confirmation === "DELETE") {
      // Clear the localStorage
      localStorage.setItem("userDetails", JSON.stringify([]));
      
      console.log("\n✓ All data has been cleared!");
      console.log("The database is now empty.");
      console.log("You can start fresh by signing up new users.");
    } else {
      console.log("\n✗ Data clearing cancelled.");
    }
    rl.close();
  });
}

// Handle close event
rl.on("close", function () {
  process.exit(0);
});

// Start the application
showMainMenu();
