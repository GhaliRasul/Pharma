const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require ('cors')
const bodyParser =require('body-parser') 
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


const db= mysql.createPool({
    host: "localhost",
    user:  "heja",
    password: "hejaheja",
    database: "pharma"
});
app.get("/api/hilfsstoffearten",(req,res)=>{ //get arts
    const sqlselect_hart="select * from HilfsstoffenArt order by artName asc ;";
    db.query (sqlselect_hart,  (err,result)=>{ 
        res.send(result);
     });
});
app.get("/api/wirkstoffe",(req,res)=>{
    const sqlselect_w ="SELECT * FROM Wirkstoffe ORDER BY wirkstoffName ASC;";
    db.query (sqlselect_w,  (err,result)=>{ 
        res.send(result);
     });
});
 
  var artarr =[];
app.post("/api/arths/:artName",(req,res)=>{ //get hilfsstoffe

    const artName = req.params.artName
    artarr.push(artName)
          const sqlselect_h ="select * from Hilfsstoffe WHERE art = ? ;";
          db.query (sqlselect_h, artarr[artarr.length-1], (err,result)=>{
              console.log('');
              });
            
              app.get("/api/his",(req,res)=>{
                const artName2 = artarr[artarr.length-1];
                      const sqlselect_h2 ="select * from Hilfsstoffe where art = ?;";
                      db.query (sqlselect_h2 , artName2, (err,result)=>{
                          res.send(result);
                          });
                        });
            });

            
            var harr =[];
  app.post("/api/lesenhf/:hilfStoffName",(req,res)=>{ //get einzel hilfsstoffe

                const hilfStoffName = req.params.hilfStoffName
                harr.push(hilfStoffName)
                      const sqlselect_hf ="select * from Hilfsstoffe WHERE hilfsstoffName = ? ;";
                      db.query (sqlselect_hf, harr[harr.length-1], (err,result)=>{
                          });
                        
                          app.get("/api/einzelH_Stoff",(req,res)=>{
                            const hilfStoffName2 = harr[harr.length-1];
                                  const sqlselect_eh ="select * from Hilfsstoffe WHERE hilfsstoffName = ?;";
                                  db.query (sqlselect_eh , hilfStoffName2, (err,result)=>{
                                      res.send(result);
                                      console.log(result);
                                     });
                                    });

                                    app.get("/api/leseProtoH",(req,res)=>{
                                        const stoffNamePro= harr[harr.length-1];
                                        const sqlselect_P ="select * from h_verfassungsprotokol hv join autor a on hv.autorId = a.autorId where stoffe= ? order by datum desc limit 1 ;";
                                        db.query (sqlselect_P, stoffNamePro,  (err,result)=>{ 
                                           ; res.send(result)
                                         });
                                    });
                     
                        });
  
                 
                        var arr =[];
app.post("/api/lesenww/:stoffName",(req,res)=>{

  const stoffName = req.params.stoffName
        arr.push(stoffName)    
        const sqlselect_w ="SELECT * FROM Wirkstoffe WHERE wirkstoffName = ? ;";
        db.query (sqlselect_w, arr[arr.length-1], (err,result)=>{
            console.log('');

                });
                app.get("/api/lese",(req,res)=>{
                    const stoffNamelese= arr[arr.length-1];
                    const sqlselect_w ="SELECT * FROM Wirkstoffe WHERE wirkstoffName = ? ;";
                    db.query (sqlselect_w, stoffNamelese,  (err,result)=>{ 
                        res.send(result);
                     });
                });

                app.get("/api/leseInter",(req,res)=>{
                    const stoffNameInter= arr[arr.length-1];
                    const sqlselect_w ="select wirkstoff2, literatur from W_interaktionen where wirkstoff1 = ?  ;";
                    db.query (sqlselect_w, stoffNameInter, (err,result)=>{ 
                        res.send(result);
                     });
                });


                app.get("/api/leseRefer",(req,res)=>{
                    const stoffNameRefer= arr[arr.length-1];
                    const sqlselect_w ="SELECT h.hilfsstoffName, h.art FROM Hilfsstoffe h ,Wirkstoffe w WHERE (w.wirkstoffName = ?) AND (w.aspect_ratio>0.5) and (h.aspect_ratio >0.5) and (w.molekularerGroesse >100 )and (h.molekularerGroesse >100) ORDER BY h.hilfsstoffName ;";
                    db.query (sqlselect_w, stoffNameRefer,  (err,result)=>{ 
                       ; res.send(result)
                     });
                });

                app.get("/api/leseProto",(req,res)=>{
                    const stoffNamePro= arr[arr.length-1];
                    const sqlselect_P ="select * from w_verfassungsprotokol wv join autor a on wv.autorId = a.autorId where stoffe= ? order by datum desc limit 1 ;";
                    db.query (sqlselect_P, stoffNamePro,  (err,result)=>{ 
                       ; res.send(result)
                     });
                });
                

         });

         var newarray=[];
         app.post("/api/such/:stoff",(req,res)=>{ //suchEmpfang

                newarray.push(req.params.stoff);
                  const sqlselect_s1 ="SELECT * FROM Wirkstoffe WHERE wirkstoffName = ? ;";
                  db.query (sqlselect_s1, newarray[newarray.length-1], (err,result)=>{
                      console.log('');
                      }); 
    
                      app.get("/api/ergebnis",(req,res)=>{
                        const suchbegriff2 = '%'+newarray[newarray.length-1]+'%';
                              const sqlselect_s2 ="select * from search where stoffname LIKE ? or synononyme LIKE ?;";
                              db.query (sqlselect_s2 , [suchbegriff2,suchbegriff2], (err,result)=>{
                                  console.log('end:'+suchbegriff2);
                                   res.send(result);
                                   console.log(result);
                                   

                                  });
                                });

                                app.get("/api/suchfielf",(req,res)=>{
                                  const suchbegriff3 = newarray[newarray.length-1];
                                        const sqlselect_s2 ="select ? as suchfield from dual;";
                                        db.query (sqlselect_s2 , suchbegriff3, (err,result)=>{
                                             res.send(result);
                                             console.log(result);
                                              newarray=[];
          
                                            });
                                          });
                   });
  


                   const prufarray=[];
                   app.post("/api/prufent",(req,res)=>{ //PrufEmfang
                        const w_stoffName=req.body.wirkstoff;
                        const h_stoffname=req.body.hilfsstoff;
                        prufarray.push(w_stoffName);
                        prufarray.push(h_stoffname);
                            const sqlselect_s1 ="select w.wirkstoffName,h.hilfsstoffName from Wirkstoffe w, Hilfsstoffe h where h.hilfsstoffName = ? AND w.wirkstoffName = ? and  w.aspect_ratio= h.aspect_ratio  ;";
                            db.query (sqlselect_s1, [h_stoffname,w_stoffName], (err,result)=>{
                              
                                });

                                app.get("/api/prufenresult",(req,res)=>{
                                    const w_stoffName2=prufarray[prufarray.length-2];
                                    const h_stoffname2=prufarray[prufarray.length-1];
                                 const sqlselect_s2 = "select w.wirkstoffName,h.hilfsstoffName from Wirkstoffe w, Hilfsstoffe h where (h.hilfsstoffName = ? ) AND (w.wirkstoffName = ?) and  (w.aspect_ratio>0.5) and (h.aspect_ratio >0.5) and (w.molekularerGroesse >100 )and (h.molekularerGroesse >100); " ;
                                          db.query (sqlselect_s2 , [h_stoffname2,w_stoffName2], (err,result)=>{
                                             
                                               res.send(result);
                                               
                                              });
                                            });    
                                            app.get("/api/philfsstoff",(req,res)=>{
                                                const h_stoffname3=prufarray[prufarray.length-1];
                                             const sqlselect_s3 = "select * from  Hilfsstoffe  where hilfsstoffName = ?  ;" ;
                                                      db.query (sqlselect_s3 , h_stoffname3, (err,result)=>{
                                                          console.log(result);
                                                           res.send(result);
                                                           
                                                          });
                                                        });


                                                        app.get("/api/pwirkstoff",(req,res)=>{
                                                            const h_stoffname3=prufarray[prufarray.length-2];
                                                         const sqlselect_s3 = "select * from  Wirkstoffe  where wirkstoffName = ?  ;" ;
                                                                  db.query (sqlselect_s3 , h_stoffname3, (err,result)=>{
                                                                      //console.log(result);
                                                                       res.send(result);
                                                                       
                                                                      });
                                                                    });
                                                    });



              
                            
                  
                


                    
                        
                       



app.listen(3001,()=>{
    console.log("runing on 3001")
});