import moment from 'moment';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, colorize, printf } = format;

const customFormat = printf(({ level, message, timestamp, stack = '' }) => {
  const ts = moment(timestamp).local().format('HH:MM:ss.SSS');
  return `${ts} ${level}: ${message} \n ${stack}`;
});

const localFormat = {
  level: 'debug',
  format: combine(colorize(), timestamp(), customFormat),
  transports: [new transports.Console()],
};

const awsFormat = {
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.logstash()),
    }),
  ],
};

const logFormat = process.env.LOG_ENV === 'aws' ? awsFormat : localFormat;

const logger = createLogger(logFormat);

export const stream = {
  write: (message: string): void => {
    logger.info(message);
  },
};

export default logger;
