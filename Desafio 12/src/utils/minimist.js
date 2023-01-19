import parseArgs from "minimist";

const options={
    default:{PORT:8080},
}

const argv = parseArgs(process.argv.slice(2),options)

export default argv