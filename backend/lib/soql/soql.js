const parser = require("./query-result-parser.js");

class SOQL{

    static createParams(body){
        return body.soql.replace(/\r|\n|\r\n/gi, " ").replace(";", "");
    }

    static getResponse(body, queryResult){

        const parsedResult = parser.parse(body, queryResult);

        return {
            columns:parsedResult.columns,
            rows:parsedResult.records,
            soqlInfo: {
                soql: body.soql,
                tabId: body.tabId,
                timestamp: parsedResult.recordCount - 1 + " rows@" + new Date().toLocaleString('ja-JP')
            }
        }

    }

}

module.exports = SOQL;