let array_with_duplicates = ['DELHI','NEWYORK','DELHI','GOA','MUMBAI','CALIFORNIA','GOA']

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

console.log(removeDuplicates(array_with_duplicates)); // [ 'DELHI', 'NEWYORK', 'GOA', 'MUMBAI', 'CALIFORNIA' ]
