module.exports = (ctx, status, message) => {
    ctx.status = status;
    return (ctx.body = {
        status,
        message,
    });
};
