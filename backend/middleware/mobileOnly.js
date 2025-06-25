module.exports = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  if (!isMobile) {
    return res.status(403).json({ error: 'Mobile-only access enforced' });
  }
  next();
};
