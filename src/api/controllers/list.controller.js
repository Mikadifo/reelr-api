import listService from "../services/list.service.js";

export const addList = async (req, res, next) => {
  try {
    const list = await listService.addList({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(list);
  } catch (err) {
    next(err);
  }
};
