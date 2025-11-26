import shareService from "../services/share.service.js";

export const getShareLink = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);

    const shareLink = await shareService.getShareLink({
      movieId,
      userId: req.user.userId,
    });

    res.json(shareLink);
  } catch (err) {
    next(err);
  }
};
