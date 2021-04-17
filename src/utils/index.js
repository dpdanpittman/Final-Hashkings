import hivesignerClient from '../services/hivesigner';

class Utils {

    sumArr(arr) {
        return arr.reduce((a, b) => a + b, 0);
    }

    removeWhitespace(str) {
        return str.replace(/\s+/g, '');
    }

    removePunctuation(str, removeWhitespace=true) {
        str = str.replace(/[.'"’,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

        str = removeWhitespace === true ? this.removeWhitespace(str): str;

        // console.log("Cleaned up string :>>", str);
        return str;
    }

    async _auth() {
        return await hivesignerClient.me((err, res) => {
            if (err) {
                alert("Unable to connect to Hivesigner: ");
                console.log("Error authenticating with Hivesigner :>>", err);
                return null;
            }
            return res;
        })
    }
}

export default new Utils();