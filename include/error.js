errorCategory={
  mysql:{
    connection:{errCode:"2",errMessage:"mysql connection error"},
    sql:{errCode:"3",errMessage:"sql language with error"},
    requireFields:{errCode:"4",errMessage:"some fields is required"},
    DuplicateInsert:{errCode:"5",errMessage:"Duplicate entry  for key 'primer.PRIMARY"},
    Duplicateaccount:{errCode:"6",errMessage:"Duplicate entry  for key 'name'"},
  },
}
module.exports=errorCategory