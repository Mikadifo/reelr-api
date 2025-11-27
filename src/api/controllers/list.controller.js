import listService from "../services/list.service.js";

export const getLists = async (req, res, next) => {
  try {
    const lists = await listService.getLists(req.user.userId);

    res.status(201).json(lists);
  } catch (err) {
    next(err);
  }
};

export const getAvailableLists = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);

    const lists = await listService.getAvailableLists(movieId, req.user.userId);

    res.json(lists);
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

export const addMovieToList = async (req, res, next) => {
  try {
    const listId = Number(req.params.listId);
    const movieId = Number(req.params.movieId);

    const list = await listService.addMovieToList(
      listId,
      movieId,
      req.user.userId,
    );

    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const removeMovieFromList = async (req, res, next) => {
  try {
    const listId = Number(req.params.listId);
    const movieId = Number(req.params.movieId);

    const list = await listService.removeMovieFromList(
      listId,
      movieId,
      req.user.userId,
    );

    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const updateListName = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const list = await listService.updateListName(
      id,
      req.body.name,
      req.user.userId,
    );

    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await listService.deleteList(id, req.user.userId);

    res.json("List deleted successfully");
  } catch (err) {
    next(err);
  }
};
