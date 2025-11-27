import listService from "../services/list.service.js";

export const getLists = async (req, res, next) => {
  try {
    const lists = await listService.getLists({ userId: req.user.userId });

    res.status(201).json(lists);
  } catch (err) {
    next(err);
  }
};

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
