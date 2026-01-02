import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );

  req.user = decoded;
  next();
};

export default authMiddleware;
