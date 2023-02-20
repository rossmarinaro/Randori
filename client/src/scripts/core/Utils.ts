/* COMMON UTILS */

export default class Utils {

    public static numbers = {
        multiplyDecimals: (valA: number, valB: number) => { return (valA * 10 + valB * 10) }
    }

    public static strings = {

        joinWithUnderscore: function (a: string, b: string): string
        {
            return a += `_${b}`;
        },

        replaceUnderscore: function(str: any): string
        {
            let strArr: string[] = [];
            for(let i = 0; i < str.length; i++)
                strArr.push(str[i]);          
            return strArr.includes('_') ? str.toString().replaceAll('_', ' ') : str;
        },

        removeUnderscore: function(str: any): string
        {
            let strArr: string[] = [];
            for(let i = 0; i < str.length; i++)
                strArr.push(str[i]);          
            return strArr.includes('_') ? str.toString().replaceAll('_', '') : str;
           
        },

        removeStringPart: async function(str: string, part: string): Promise<string>
        {      
           return str.toString().replace(part, '');
        },

        removeNumbers: async function(str: string): Promise<string>
        {      
            let strArr: string[] = [],
                numArr: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            for(let char = 0; char < str.length; char++)
                strArr.push(str[char]); 
                    
            const check = async ()=> {
                for(let char = 0; char < strArr.length; char++)
                    if (numArr.includes(strArr[char].toString()))
                    {
                        let _string = strArr.filter(i => isNaN(parseInt(i)));  
                        return _string.join('');
                    }
                    return str;
            }
            const newStr = await check();

            return newStr;
     
        },

        removeJunk: async function(str: any): Promise<string>
        {
            const 
            rmvUnderscore = this.replaceUnderscore(str),
            rmvNumbers = await this.removeNumbers(rmvUnderscore),
            newStr = await this.removeStringPart(rmvNumbers, 'tile');

            return newStr;
        },

        checkSpace: async function(str: string): Promise<string>
        {  
            return str.includes(' ') ? str.replace(' ', '') : str;
        },
        
        checkVowel: async function(str: string): Promise<string>
        {
            const 
                vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u'],
                firstChar = str[0];

            let result = vowels.includes(firstChar) ? 'an ' : 'a ';

            if (str.endsWith('s')) //if plural, return empty character
                result = '';

            return result;
        }
    }
        
    //------------------------------------------ get file type

    public static async getFileType(scene: Phaser.Scene, key: string): Promise<Readonly<string>>
    {
        const cache = scene.cache.json.get('resources_main'),
                obj = cache.assets.filter((asset: any) => Object.keys(asset).toString() === key),
                file: Object = Object.entries(obj[0]),
                extension = file[0][1].endsWith('glb') ? 'glb' : 'fbx';

        return extension;
    }


    
}