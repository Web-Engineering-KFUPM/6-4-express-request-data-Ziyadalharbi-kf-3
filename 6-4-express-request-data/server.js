import express from "express";

const app = express();

/* ============================================
   TODO-1 (Server Setup)
============================================ */
app.get("/", (req, res) => {
  res.send("Server is up 🚀");
});

/* ============================================
   TODO-2 (/echo route)
============================================ */
app.get("/echo", (req, res) => {
  const { name, age } = req.query;

  if (!name || !age) {
    return res.status(400).json({
      ok: false,
      error: "name & age required",
    });
  }

  res.json({
    ok: true,
    name,
    age,
    msg: `Hello ${name}, you are ${age}`,
  });
});

/* ============================================
   TODO-3 (/profile/:first/:last route)
============================================ */
app.get("/profile/:first/:last", (req, res) => {
  const { first, last } = req.params;

  res.json({
    ok: true,
    fullName: `${first} ${last}`,
  });
});

/* ============================================
   TODO-4 (Param middleware)
============================================ */
app.param("userId", (req, res, next, userId) => {
  const num = Number(userId);

  if (!Number.isInteger(num) || num <= 0) {
    return res.status(400).json({
      ok: false,
      error: "userId must be positive number",
    });
  }

  req.userIdNum = num;
  next();
});

/* ============================================
   TODO-5 (/users/:userId route)
============================================ */
app.get("/users/:userId", (req, res) => {
  res.json({
    ok: true,
    userId: req.userIdNum,
  });
});

/* ============================================
   Start Server
============================================ */
app.listen(3000, () => {
  console.log("API running at http://localhost:3000");
});
//