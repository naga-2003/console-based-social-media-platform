const readline = require("readline");
const { LocalStorage } = require("node-localstorage");
const { json } = require("stream/consumers");
const { ftruncate } = require("fs");
const { time, timeStamp, Console } = require("console");
const localStorage = new LocalStorage("./newspaper");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let details = [];
console.log(localStorage.getItem("userDetails"));
// localStorage.setItem("userDetails", JSON.stringify(details));
let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
let currentUser;
for (let i = 0; i < storedDetails.length; i++) {
  if (storedDetails[i].loginStatus) {
    currentUser = storedDetails[i];
    break;
  }
}
console.log(currentUser);
console.log("===================================");
console.log("      SOCIAL MEDIA PAGE      ");
console.log("===================================");
console.log("Sign up to connect with friends and the world around you.");
console.log("===================================");
console.log("Please provide the following details to create your account:");
console.log("1. Sign Up");
console.log("2. Log Out");
console.log("3. Log In");
console.log("4. Send Friend Request");
console.log("5. Accpet Friend Request");
console.log("6. Friend Details:");
console.log("7. Create Post:");
console.log("8. Feeds:");
console.log("9. Exit");
rl.question("Choose an option (1-9): ", function (flow) {
  if (flow === "9") {
    rl.close();
  } else if (flow === "8") {
    feeds();
  } else if (flow === "7") {
    createPost();
  } else if (flow === "6") {
    displayFriends();
  } else if (flow === "5") {
    acceptFriendRequest();
  } else if (flow === "4") {
    friendRequest();
  } else if (flow === "3") {
    console.log("Log In");
    let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
    rl.question("Enter your name: ", function (name) {
      rl.question("Enter your Email: ", function (email) {
        for (let i = 0; i < storedDetails.length; i++) {
          if (
            storedDetails[i].name === name &&
            storedDetails[i].email === email
          ) {
            storedDetails[i].loginStatus = true;
            localStorage.setItem("userDetails", JSON.stringify(storedDetails));
            console.log("Login Successful!");
            console.log("Welcome back, " + name + "!");
            rl.close();
            break;
          }
          if (i === storedDetails.length - 1 && !storedDetails[i].loginStatus) {
            console.log("Login Failed! Please check your credentials.");
            rl.close();
          }
        }
      });
    });
  } else if (flow === "2") {
    let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
    for (let i = 0; i < storedDetails.length; i++) {
      if (storedDetails[i].loginStatus) {
        storedDetails[i].loginStatus = false;
        localStorage.setItem("userDetails", JSON.stringify(storedDetails));
        break;
      }
    }
    console.log("Logout Successful!");
    rl.close();
  } else if (flow === "1") {
    signUp();
  } else {
    console.log("Invalid Option! Please choose a valid option (1-3).");
    rl.close();
  }
});

function signUp() {
  console.log("===================================");
  console.log("Sign Up");
  console.log("Enter your Details:");
  rl.question("Enter your name: ", function (name) {
    rl.question("Enter your secondary DOB: ", function (dob) {
      rl.question("Enter your email: ", function (email) {
        rl.question("Enter your Location: ", function (location) {
          rl.question("Enter your Occupation: ", function (occupation) {
            let details = JSON.parse(
              localStorage.getItem("userDetails") || "[]",
            );
            details.push({
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
              followerCount: function () {
                return this.followers.length;
              },
              posts: { totalPosts: 0, postList: [] },
            });
            localStorage.setItem("userDetails", JSON.stringify(details));
            console.log("Your Details:", details);
            rl.close();
          });
        });
      });
    });
  });
  rl.on("close", function () {
    console.log("\nThank you for using our Social Media Page!");
    process.exit(0);
  });
}

function friendRequest() {
  let currentUser = JSON.parse(localStorage.getItem("userDetails")).find(
    (u) => u.loginStatus === true,
  );
  if (!currentUser) {
    console.log("Please log in to send friend requests.");
    rl.close();
    return;
  }
  rl.question(
    "Enter the name of the person you want to send a friend request to: ",
    function (friendName) {
      let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
      let currentUser;
      for (let i = 0; i < storedDetails.length; i++) {
        if (storedDetails[i].loginStatus) {
          currentUser = storedDetails[i];
          break;
        }
      }
      if (currentUser.name === friendName) {
        console.log("You cannot send a friend request to yourself!");
        rl.close();
        return;
      }
      let friendUser = storedDetails.find((u) => u.name === friendName);
      if (friendUser) {
        currentUser.friendRequests.sent.push(friendUser.id);
        friendUser.friendRequests.received.push(currentUser.id);
        localStorage.setItem("userDetails", JSON.stringify(storedDetails));
        console.log("Friend request sent to " + friendName + "!");
      } else {
        console.log("User " + friendName + " not found!");
      }

      rl.close();
    },
  );
  if (currentUser) {
  }
}

function acceptFriendRequest() {
  let storedDetails = JSON.parse(localStorage.getItem("userDetails"));

  let currentUser = storedDetails.find((u) => u.loginStatus === true);
  if (!currentUser) {
    console.log("Please log in to accept friend requests.");
    rl.close();
    return;
  }
  console.log("Your Friend Requests:");
  console.log(currentUser.friendRequests.received);
  console.log("===================================");
  console.log("1. Accept All");
  console.log("2. Accept Specific");
  rl.question("Choose an option (1-2): ", function (option) {
    if (option === "1") {
      // Accept all friend requests
      currentUser.friendRequests.received.forEach((friendId) => {
        let friendUser = storedDetails.find((u) => u.id === friendId);
        if (friendUser) {
          currentUser.followers.push(friendId);
          friendUser.following.push(currentUser.id);
          friendUser.friendRequests.sent =
            friendUser.friendRequests.sent.filter(
              (id) => id !== currentUser.id,
            );
        }
      });
      currentUser.friendRequests.received = [];
      localStorage.setItem("userDetails", JSON.stringify(storedDetails));
      console.log("All friend requests accepted!");
      rl.close();
    } else if (option === "2") {
      rl.question(
        "Enter the name of the friend to accept: ",
        function (friendName) {
          let friendUser = storedDetails.find((u) => u.name === friendName);
          if (
            friendUser &&
            currentUser.friendRequests.received.includes(friendUser.id)
          ) {
            currentUser.followers.push(friendUser.id);
            friendUser.following.push(currentUser.id);
            currentUser.friendRequests.received =
              currentUser.friendRequests.received.filter(
                (id) => id !== friendUser.id,
              );
            friendUser.friendRequests.sent =
              friendUser.friendRequests.sent.filter(
                (id) => id !== currentUser.id,
              );
            localStorage.setItem("userDetails", JSON.stringify(storedDetails));
            console.log("Friend request from " + friendName + " accepted!");
          } else {
            console.log("No friend request from " + friendName + " found!");
          }
          rl.close();
        },
      );
    } else {
      console.log("Invalid Option! Please choose a valid option (1-2).");
      rl.close();
    }
  });
}

function displayFriends() {
  let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentUser = storedDetails.find((u) => u.loginStatus === true);
  if (!currentUser) {
    console.log("Please log in to view your friends.");
    rl.close();
    return;
  }
  let totalFriends = [...currentUser.followers, ...currentUser.following];
  console.log("Your Friends:");
  totalFriends.forEach((friendId) => {
    let friendUser = storedDetails.find((u) => u.id === friendId);
    if (friendUser) {
      console.log("===================================");
      console.log("- " + friendUser.name);
      console.log(" Age: " + friendUser.dob);
      console.log(" Location: " + friendUser.location);
      console.log(" Occupation: " + friendUser.occupation);
      console.log("===================================");
    }
  });
  rl.close();
}

function createPost() {
  let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentUser = storedDetails.find((u) => u.loginStatus === true);
  if (!currentUser) {
    console.log("Please log in to create posts.");
    rl.close();
    return;
  }

  rl.question("Enter the post content: ", function (postcontent) {
    let post = {
      id: Math.floor(Math.random() * 10000),
      name: currentUser.name,
      userId: currentUser.id,
      content: postcontent,
      timeStamp: new Date().getTime(),
      likes: [],
      likesCount: 0,
      comments: [],
      commentsCount: 0,
    };
    currentUser.posts.postList.push(post);
    currentUser.posts.totalPosts++;
    localStorage.setItem("userDetails", JSON.stringify(storedDetails));

    console.log("Post created successfully!");
    rl.close();
  });
}

function feeds() {
  let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentUser = storedDetails.find((u) => u.loginStatus === true);
  if (!currentUser) {
    console.log("Please log in to view feeds.");
    rl.close();
    return;
  }

  let friendUser = storedDetails.filter((u) => u.id !== currentUser.id);
  let lastestPost = [];
  friendUser.forEach((friendUser) => {
    friendUser.posts.postList.forEach((post) => {
      lastestPost.push(post);
    });
  });

  let sortedPosts = lastestPost.sort((a, b) => b.timeStamp - a.timeStamp);

  sortedPosts.forEach((post) => {
    console.log("===================================");
    console.log("Post ID: " + post.id);
    console.log("Name: " + post.name);
    console.log("User Id: " + post.userId);
    console.log("Content: " + post.content);
    console.log("Time: " + new Date(post.timeStamp).toLocaleString());
    console.log("Likes: " + (post.likes ? post.likes.length : 0));
    console.log("Comments: " + (post.comments ? post.comments.length : 0));
    console.log("===================================");
  });

  // likesComments(sortedPosts);
  mutualFriends()
}

function likesComments(newList) {
  let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentUser = storedDetails.find((u) => u.loginStatus === true);
  console.log("===================================");
  console.log("1. Like a post");
  console.log("2. Comment on a post");
  console.log("3. Exit");
  rl.question("Choose an option (1-3): ", function (option) {
    if (option == "1") {
      rl.question("Choose the post (ID): ", function (id) {
        let postFound = false;
        let numId = parseInt(id);
        storedDetails.forEach((user) => {
          user.posts.postList.forEach((post) => {
            if (post.id === numId) {
              postFound = true;

              if (post.likes.includes(currentUser.id)) {
                console.log("You already liked this post!");
              } else {
                post.likes.push(currentUser.id);
                console.log("Post liked successfully!");
                post.likesCount++;
              }
            }
          });
          localStorage.setItem("userDetails", JSON.stringify(storedDetails));
          if (!postFound) {
            console.log("Post not found!");
            rl.close();
          }
        });
      });
    } else if (option == "2") {
      rl.question("Enter the post ID to comment: ", function (id) {
        let postFound = false;
        let numId = parseInt(id);
        storedDetails.forEach((user) => {
          user.posts.postList.forEach((post) => {
            if (post.id == numId) {
              postFound = true;

              rl.question("Enter your comment: ", function (commentText) {
                let comment = {
                  comment: commentText,
                  userId: currentUser.id,
                  userName: currentUser.name,
                  timestamp: new Date().getTime(),
                };

                post.comments.push(comment);
                post.commentsCount++;
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(storedDetails),
                );
                console.log("Comment added successfully!");
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
    } else if (option == "3") {
      console.log("Exiting...");
      rl.close();
    } else {
      console.log("Invalid option!");
      rl.close();
    }
  });
}

  function mutualFriends() {
    let storedDetails = JSON.parse(localStorage.getItem("userDetails"));
    let currentUser = storedDetails.find((u) => u.loginStatus === true);
    if (!currentUser) {
      console.log("Please log in first.");
      rl.close();
      return;
    }

    rl.question("Click the friend user: ", function (user) {
      let friendUser = storedDetails.find((u) => 
        u.id == user || u.name === user  
      );

    if (!friendUser) {
      console.log("User not found.");
      rl.close();
      return;
    }

      let currentUserFriends = [ ...new Set([
        ...currentUser.followers,
        ...currentUser.following,])
      ];
      let friendUserFriends = [...new Set([...friendUser.followers, ...friendUser.following])];

      let mutualFriends = currentUserFriends.filter((friends) => 
        friendUserFriends.includes(friends)
      );
      if (mutualFriends.length === 0) {
        console.log("No mutual friends found.");
      } else {
        let isFriend = currentUser.following.includes(friendUser.id);

        mutualFriends.forEach((friends) => {
          let mutual = storedDetails.find((user) => user.id === friends);
         if (mutual) {
          if (!isFriend) {
            console.log(`Followed by ${mutual.name}`);
          } else {
            console.log(`${mutual.name}`);
            console.log(`${mutualFriends.length}`)
          }
        }

        });
      }
          rl.close();

    });
  }
