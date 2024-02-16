import admin from "../firebase/firebase-config"

class Middleware {
  async verifyToken(req, res, next) {
    try {
      console.log("holis desde el middleware");
      const token = req.headers.authorization.split(" ")[1];
      console.log("holis desde el token", token);
      const decodedToken = await admin.auth().verifyIdToken(token);

      if (decodedToken) {
        console.log(decodedToken);
        req.user = decodedToken;
        return next();
      }
      return res.json({ message: "Unauthorized" });
    } catch (error) {
      return res.json({ message: "Error Isa" });
    }
  }
}

export default new Middleware();




// model User {
//     id      Int      @id @default(autoincrement())
//     email   String   @unique
//     name    String
//     surName String?
//     identification String?
//     phone String?
//     dateIn DateTime? @default(now())
//     dateOut DateTime?
//     description String?
//     linkedin String?
//     languaje String? 
//     position String? 
//     role Role @default(Usuario)
//     participants Participant[]
//     payment Payment[]
//     donation Donation[]
//     event Event[]
//     commentary Commentary[] 
//     favorite Favorite[]
//   }