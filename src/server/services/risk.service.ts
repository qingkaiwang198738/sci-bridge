const URL_RE=/https?:\/\//gi;
const AD_RE=/(加微信|扫码|代理|返现|优惠|推广|兼职)/gi;
const ILLEGAL_RE=/(枪支|毒品|赌博|洗钱)/gi;
export function scoreContent(itemName:string,content:string){const text=`${itemName}\n${content}`;let score=0;score+=Math.min(4,(text.match(URL_RE)||[]).length);score+=Math.min(4,(text.match(AD_RE)||[]).length*2);score+=Math.min(8,(text.match(ILLEGAL_RE)||[]).length*4);return Math.min(100,score*5);}
