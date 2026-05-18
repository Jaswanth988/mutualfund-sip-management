const logger = require("./logger");
const UAParser = require("ua-parser-js");

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  // Parse user-agent
  const parser = new UAParser(req.headers["user-agent"]);
  const ua = parser.getResult();

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    req.ip;
  const method = req.method;
  const url = req.originalUrl;
  const protocol = req.protocol;
  const browser = `${ua.browser.name || "Unknown"} ${
    ua.browser.version || ""
  }`;

  const os = `${ua.os.name || "Unknown"} ${
    ua.os.version || ""
  }`;
  const device = ua.device.type || "Desktop";
  const deviceModel = ua.device.model || "Unknown";
  const cpu = ua.cpu.architecture || "Unknown";
  res.on("finish", () => {
    const responseTime = Date.now() - start;

    const logData = {
      time: new Date().toISOString(),
      method,
      url,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      ip,
      protocol,
      browser,
      os,
      device,
      deviceModel,
      cpu,
      userAgent: req.headers["user-agent"],
    };

    logger.info(logData);
  });

  next();
};

module.exports = loggerMiddleware;