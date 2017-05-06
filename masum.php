<?php include ('includes/sess.php') ?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Basic Info | Elegant Resume</title>
    <?php include ('includes/fav.php') ?>

    <?php include ('includes/top_imports.php') ?>

    <style>
      .cropit-preview {
        background-color: #f8f8f8;
        background-size: cover;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-top: 7px;
        width: 250px;
        height: 250px;
      }

      .cropit-preview-image-container {
        cursor: move;
      }

      .image-size-label {
        margin-top: 10px;
      }

    </style>


  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">

        <?php include ('includes/menu.php') ?>

        <?php include ('includes/top_nav.php') ?>


        <!-- page content -->
        <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Basic Info</h3>
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 pull-right">
                  <a href="help.php" class="btn btn-block btn-info"><i class="fa fa-info-circle"></i> Help </a>
                </div>
              </div>
            </div>
            <div class="clearfix"></div>
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h4>Required fields are marked with *</h4>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <br />
                    <form id="img-form" enctype="multipart/form-data" data-parsley-validate class="form-horizontal form-label-left" action="javascript:form_submitted();">





                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Avatar
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <div  class="text-center well" style="margin-bottom: 10px">
                            <img src="images/loading_spinner.gif" class="img-circle" id="avatar" alt="No image" width="100px" height="100px" />
                          </div>

                          <button class="btn btn-success" type="button" id="imageToUpload" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#cropit_modal">Change Avatar</button>

                        </div>
                      </div>


                      <div id="cropit_modal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-sm">


                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                              </button>
                              <h4 class="modal-title" id="myModalLabel">Upload New Avatar</h4>
                              <h5>Minimum 250x250 pixels</h5>
                            </div>

                            <div class="modal-body">
                              <div class="row">
                                <div class="image-editor text-center" style="max-width: 250px; margin-left: 18px;">
                                  <div class="cropit-preview"></div>
                                  <input style="margin-top: 20px; margin-bottom: 20px;" type="file" class="cropit-image-input">

                                  <div>
                                    <div class="image-size-label">
                                      Resize image
                                    </div>
                                    <input type="range" class="cropit-image-zoom-input">
                                  </div>

                                </div>
                              </div>
                            </div>

                            <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                              <button type="button" class="btn btn-success" id="pseudo_submit">Update Avatar</button>
                            </div>

                          </div>

                        </div>
                      </div>























                      <div class="ln_solid" style="margin-top: 20px"></div>

                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="basic_name">Name<span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input data-parsley-required="true" type="text" id="basic_name"  class="form-control col-md-7 col-xs-12">
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="basic_country">Country<span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input data-parsley-required="true" type="text" id="basic_country"  class="form-control col-md-7 col-xs-12">
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="basic_email">Email<span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input data-parsley-required="true" type="email" id="basic_email"  class="form-control col-md-7 col-xs-12">
                        </div>
                      </div>


                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="basic_contact">Contact No<span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input data-parsley-required="true" data-parsley-pattern="^[\d\+\-\.\(\)\/\s]*$" id="basic_contact"  class="form-control col-md-7 col-xs-12">
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="basic_objective">Objective (200 chars max)</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea id="basic_objective" class="form-control" data-parsley-trigger="keyup" data-parsley-minlength="0" data-parsley-maxlength="200" data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.."
                                              data-parsley-validation-threshold="10"></textarea>
                        </div>

                      </div>


                      <div class="form-group">
                        <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                          <button class="btn btn-primary" type="reset">Reset</button>
                          <button type="submit" class="btn btn-success">Update Profile</button>
                        </div>
                      </div>




                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <script type="text/javascript" src="js/basic.js"></script>
        /page content -->

        <?php include ('includes/footer.php') ?>
      </div>
    </div>

    <?php include ('includes/bottom_imports.php') ?>
    <script src="../vendors/cropit-master/dist/jquery.cropit.js"></script>
    <script type="text/javascript" src="js/basic.js"></script>
    <script>
      $(window).load(function() {
        console.log("cropfit");
        $('.image-editor').cropit();

        $('#pseudo_submit').click(function() {

          console.log("click");


          // post
          var imageData = $('.image-editor').cropit('export');
          console.log(imageData);
          if("undefined" !== typeof imageData) {
            // hide
            $('#cropit_modal').modal('hide');


            // load
            $("#avatar").attr('src', 'images/loading_spinner.gif');





            $.ajax({
              type: "POST",
              url: "../db-app/cropped_image.php",
              dataType: 'text',
              data: {
                user: '<?php echo $_SESSION['user'] ?>',
                base64data : imageData
              },
              success: function (res) {
                // document.getElementById("response").innerHTML = res;
                console.log(res);

                if(res.indexOf("ERR")==-1) {
                  new PNotify({
                    title: 'Success',
                    text: "Avatar updated!",
                    type: 'success',
                    styling: 'bootstrap3'
                  });

                  var splits = res.split("###");
                  console.log(splits);
                  res = splits[1];

                  if(res.length>0)
                    $("#avatar").attr('src', "../"+res);
                  else
                    $("#avatar").attr('src', 'images/avatar.png');

                }
                else {
                  new PNotify({
                    title: 'Error :(',
                    text: "Something went wrong",
                    type: 'error',
                    styling: 'bootstrap3'
                  });
                }
              }
            });
          }
          else {
            new PNotify({
              title: 'Error',
              text: "Choose a file to upload",
              type: 'error',
              styling: 'bootstrap3'
            });
          }

        });
      });
    </script>

  </body>
</html>
