// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, req, res, next) => {
    const statusCode = (res.statusCode >= 400 ? res.statusCode : 400) || 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
export default errorHandler;
//# sourceMappingURL=errorMiddleware.js.map