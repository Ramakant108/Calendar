
export const generateArray=(currntyear)=>{
    let year=currntyear;
    let left=[]
    let right=[];

    for(let i=1;i<=10;i++){
        left.unshift(currntyear-i)
        
        right.push(year+i);
    }
    return [...left,currntyear,...right]
}