const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (comment) => {
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comments.ejs"
  );
  console.log("line 7", comment);
  const data = comment.user;
  console.log("line 9", data);
  nodeMailer.transporter.sendMail(
    {
      from: "sameerjawed05@gmail.com",
      to: data.email,
      subject: "New Comment Published!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};
