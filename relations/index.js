const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

// User.find().populate("friends")

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Post.find() -> mongoose get me all the posts in post collection
// .populate("owner") -> mongoose please check the owner property for an object id.
// oh, owner is an object id and is referencing the users collection
// grabs that objectid, and internallu does User.findById(owner)
// before serving the array, on each array, it appends the user information on the object

const Post = mongoose.model("Post", postSchema);

const User = mongoose.model("User", userSchema);

const objectId = "5fb398f1b8d08f934214d4d3";
const secondUser = "5fb39db231a9469ba0551ca1";
// [User]
mongoose
  .connect("mongodb://localhost/relations", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    User.findByIdAndUpdate(objectId, { username: "iPad" }, { new: true }).then(
      (updatedUser) => {
        console.log("updatedUser:", updatedUser);
      }
    );

    //  User.findById(objectId).then((res) => {
    //    console.log("res:", res);
    //  });
    //  User.findByIdAndUpdate(
    //    objectId,
    //    { $addToSet: { friends: secondUser } },
    //    { new: true }
    //  ).then((users) => {
    //    console.log(users);
    //  });
    //  User.find()
    //    .populate("friends")
    //    .then((usersWithPosts) => {
    //      console.log("usersWithPosts:", JSON.stringify(usersWithPosts, null, 4));
    //    });
    //  Post.find().then((allPosts) => {
    //    console.log("allPosts:", allPosts);
    //  });
    //  User.findByIdAndUpdate(
    //    objectId,
    //    { $push: { posts: "5fb39933032c3b93b38fe244" } },
    //    { new: true }
    //  ).then((updated) => {
    //    console.log("updated:", updated);
    //  });
    //  Post.find()
    //    .populate("owner")
    //    .then((allPosts) => {
    //      console.log("allPosts:", allPosts);
    //    });
    //  Post.create({
    //    title: "This is my first ever post",
    //    body: "Hello world",
    //    owner: "5fb398f1b8d08f934214d4d3",
    //  }).then((res) => {
    //    console.log("Created", res);
    //  });
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
