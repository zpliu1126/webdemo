blastPath=/home/genome/ycyang/biosoft/ncbi-blast-2.6.0+/bin
outFile=${2}
queryFile=${1}
dataBasePath=/home/genome/zpliu/Data/Blast_lib
blastType=${3}
dataBase=${4}
otherArgs=${5}

if [ ${blastType} -eq 1 ];then
${blastPath}/blastn -query ${queryFile} -outfmt 0 -db ${dataBasePath}/${dataBase} -out ${outFile} ${otherArgs} 
fi
if [ ${blastType} -eq 2 ];then
${blastPath}/blastp -query ${queryFile} -outfmt 0 -db ${dataBasePath}/${dataBase} -out ${outFile} ${otherArgs} 

fi
