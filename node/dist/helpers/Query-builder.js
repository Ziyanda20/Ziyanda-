"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    _model;
    _find;
    constructor(model) {
        this._model = model;
        this._find = null;
    }
    getQueryOptions(query) {
        return {
            select: query.select || "",
            populate: query.populate || null,
            limit: query.limit || null,
            skip: query.skip || null,
            sort: query.sort || { createdAt: -1 },
        };
    }
    findAll = (condition) => this._model.find(condition);
    findOnlyOne = (condition) => this._model.findOne(condition);
    findAllWithOr = (condition) => this._model.find({ $or: condition });
    findOnlyOneWithOr = (condition) => this._model.findOne({ $or: condition });
    populate = (populate) => {
        if (!populate)
            return;
        populate.forEach((field) => {
            this._find.populate(field[0], field[1]);
        });
    };
    execFind = (query) => {
        const { find, select, populate, limit, skip, sort } = query;
        this._find = find;
        this._find.select(select);
        this._find.sort(sort);
        this.populate(populate);
        if (limit)
            this._find.limit(limit);
        if (skip)
            this._find.skip(skip);
        return this._find.exec();
    };
    add = (data) => this._model.create(data);
    exists = (condition) => new Promise(async (resolve, reject) => {
        const doc = await this.findOne({
            condition,
        });
        resolve(doc ? true : false);
    });
    count = (condition) => new Promise((resolve, reject) => {
        try {
            resolve(this._model.where(condition).countDocuments().exec());
        }
        catch (error) {
            reject(error);
        }
    });
    find = (query) => this.execFind({
        find: this.findAll(query.condition),
        ...this.getQueryOptions(query),
    });
    findOne = (query) => this.execFind({
        find: this.findOnlyOne(query.condition),
        ...this.getQueryOptions(query),
    });
    findWithOr = (query) => this.execFind({
        find: this.findAllWithOr(query.condition),
        ...this.getQueryOptions(query),
    });
    findOneWithOr = (query) => this.execFind({
        find: this.findOnlyOneWithOr(query.condition),
        ...this.getQueryOptions(query),
    });
    updateOne = (condition, data) => new Promise((resolve, reject) => {
        const update = this._model.updateOne(condition, data);
        if (update.nModified != 0)
            resolve(update);
        else
            reject("Something went wrong, try again later");
    });
    updateOneAndGet = (condition, data) => new Promise((resolve, reject) => {
        const update = this._model.findOneAndUpdate(condition, data, {
            new: true,
        });
        resolve(update);
    });
}
exports.default = QueryBuilder;
//# sourceMappingURL=Query-builder.js.map