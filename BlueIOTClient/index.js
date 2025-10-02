(function () {

    var filter_tag = [];
    var tag_id_all = "";
    var salt_val = "abcdefghijklmnopqrstuvwxyz20191107salt"
    window.UpdateFilterTag = function (obj) {
        var b_update;
        for (var id in obj) {
            if (!(id in filter_tag)) {
                b_update = true;
                break;
            }
        }
        for (var id in filter_tag) {
            if (id == tag_id_all) continue;
            if (!(id in obj)) {
                b_update = true;
                break;
            }
        }
        if (b_update) {
            filter_tag = {};
            filter_tag[tag_id_all] = tag_id_all;
            for (var id in obj) {
                filter_tag[id] = id;
            }

            var filter_tag_sel = document.getElementById("filter_tag");
            var last_sel = filter_tag_sel.value;
            filter_tag_sel.innerHTML = "";

            for (var id in filter_tag) {
                var dom_opt = document.createElement("option");
                dom_opt.value = id;
                if (last_sel == id) {
                    dom_opt.setAttribute('selected', true);
                }
                dom_opt.innerHTML = id;
                filter_tag_sel.appendChild(dom_opt);
            }
        }

    }

    var val_show_tag_pos = "Debug Data";
    var val_show_gao_jing = "Debug Data";
    var val_show_dm_data = "Debug Data";
    var val_modfiy_data = "Debug Data";
    var val_show_append_info = "Debug Data";
    var val_show_study_info="Debug Data";
    var val_show_person_info = "Debug Data";
    var val_show_base_state = "Debug Data";
    var val_show_command = "Debug Data"
    var val_show_video_state = "Debug Data";
    var val_show_area_info = "Debug Data";
    var val_show_tag_power = "Debug Data";
    var val_show_tag_iot = "Debug Data";
    var val_show_sign_info = "Debug Data"
    var val_show_btns = "";
    var val_show_buffer = "";

    function animate() {
        requestAnimationFrame(animate);

        var dom = document.getElementById("show_tag_pos");
        if (dom) {
            dom.value = val_show_tag_pos;
        }

        var dom = document.getElementById("show_gao_jing");
        if (dom) {
            dom.value = val_show_gao_jing;
        }

        var dom = document.getElementById("show_dm_data");
        if (dom) {
            dom.value = val_show_dm_data;
        }

        // var dom = document.getElementById("show_modfiy_data");
        // if (dom) {
        //     dom.value = val_modfiy_data;
        // }

        var dom = document.getElementById("show_heart_info");
        if (dom) {
            dom.value = val_show_append_info;
        }

        // var dom = document.getElementById("show_heart_study_info");
        // if (dom) {
        //     dom.value = val_show_study_info;
        // }
        
        var dom = document.getElementById("show_person_info");
        if (dom) {
            dom.value = val_show_person_info;
        }

        var dom = document.getElementById("show_base_state");
        if (dom) {
            dom.value = val_show_base_state;
        }

        var dom = document.getElementById("show_command");
        if (dom) {
            dom.value = val_show_command;
        }

        var dom = document.getElementById("show_video_state");
        if (dom) {
            dom.value = val_show_video_state;
        }


        var dom = document.getElementById("show_area_info");
        if (dom) {
            dom.value = val_show_area_info;
        }

        var dom = document.getElementById("show_tag_power");
        if (dom) {
            dom.value = val_show_tag_power;
        }

        var dom = document.getElementById("show_tag_iot");
        if (dom) {
            dom.value = val_show_tag_iot;
        }

        var dom = document.getElementById("show_sign_info");
        if (dom) {
            dom.value = val_show_sign_info;
        }

    }
    animate();

    var time_str = "";
    setInterval(function () {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var ss = date.getMilliseconds();
        time_str = `${h}:${m}:${s}:${ss}`;
    }, 1)

    // Json data formatting
    function JsonToLine(obj, par) {
        var data_str = "";
        for (var key in obj) {
            if (key) {
                data_str = data_str + key + ":" + JSON.stringify(obj[key]) + "\n";
            }
        }
        var str = "{" + "\n" + data_str + "}";
        return str
    }

    // Prevent data overload
    function delData(isDel) {
        if (isDel) {
            if (tagpos_count == 10) {
                val_show_tag_pos = "";
                tagpos_count = 0;
            } else if (basestate_count == 30) {
                val_show_base_state = "";
                basestate_count = 0;
            } else if (gaojing_count == 50) {
                val_show_gao_jing = "";
                gaojing_count = 0;
            } else if (dmdata_count == 30) {
                val_show_dm_data = "";
                dmdata_count = 0;
            } else if (modify_count == 50) {
                val_modfiy_data = "";
                modify_count = 0;
            } else if (append_count == 50) {
                val_show_append_info = "";
                append_count = 0;
            } else if (person_count == 50) {
                val_show_person_info = "";
                person_count = 0;
            } else if (video_count == 50) {
                val_show_video_state = "";
                video_count = 0;
            } else if (areaInfo_count == 50) {
                val_show_area_info = "";
                areaInfo_count = 0;
            } else if(tagPowerCount == 50) {
                val_show_tag_power = ""
                tagPowerCount = 0
            }else if(tagPowerCount == 10) {
                val_show_tag_iot = ""
                tagIotCount = 0
            } else if(sign_count == 50) {
                val_show_sign_info = ""
                sign_count =0
            }
        }
    }

    var exportData = "";

    window.dataToTxt = function () {
        exportData = `Location real-time data recording:` + val_show_tag_pos_export + `Real-time alarm data recording:` +
            val_show_gao_jing_export + `Regional real-time data recording:` + val_show_dm_data_export + `Data Update Records:` +
            val_modfiy_data_export + `Other sensor data recording:` + val_show_append_info_export + `Online tag data recording:` +
            val_show_person_info_export + `Base station data recording:` + val_show_base_state_export + `Video linkage data recording:` + val_show_video_state_export;
        // var excelHtml = `<html><head><meta charset='utf-8' /></head><body>${exportData}</body></html>`;
        Export(exportData);
    }

    function Export(data) {
        var excelBlob = new Blob([data], {
            type: 'application/vnd.ms-excel'
        })
        var oA = document.createElement('a');
        // Generate the blob URL for the a element using the url.createObjecturl () method
        oA.href = URL.createObjectURL(excelBlob);
        // Name the file
        oA.download = 'All Records.txt';
        oA.click();
    }
    var tagpos_count = 0;
    var val_show_tag_pos_export = "";
    var tagPowerCount = 0
    var tagIotCount = 0

    function showTagPos(val) {
        tagpos_count++;
        delData(true);
        val = JsonToLine(val);
        val_show_tag_pos = "Real-time location data (parsed content): " + time_str + val + "\n" + val_show_tag_pos;
    }

    function showTagPower(val) {
        tagPowerCount++;
        delData(true);
        val = JsonToLine(val);
        val_show_tag_power = "Battery info (parsed content): " + time_str + val + "\n" + val_show_tag_power;
    }

    function showTagIot(val) {
        tagIotCount++;
        delData(true);
        val = JsonToLine(val);
        val_show_tag_iot = "Tags customize iot data (parsed content): " + time_str + val + "\n" + val_show_tag_iot;
    }

    var gaojing_count = 0;
    var val_show_gao_jing_export = "";

    function showGaoJing(val) {
        gaojing_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_gao_jing = "Real-time alarm data (parsed content): " + time_str + val + "\n" + val_show_gao_jing;
    }


    var areaInfo_count = 0;

    function showAreaInfo(val) {
        areaInfo_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_area_info = "Regional out/in notification (parsed content): " + time_str + val + "\n" + val_show_area_info;
    }

    var dmdata_count = 0;
    var val_show_dm_data_export = "";

    function showDmData(val) {
        dmdata_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_dm_data = "Regional statistics (parsed content): " + time_str + val + "\n" + val_show_dm_data;
    }

    var modify_count = 0;
    var val_modfiy_data_export = "";


    var append_count = 0;
    var val_show_append_info_export = "";

    function showHeartInfo(val) {
        append_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_append_info = "Original heart rate (parsed content): " + time_str + val + "\n" + val_show_append_info;
    }
    sign_count =0
    function showSignData(val) {
        sign_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_sign_info = "Sign data (parsed content)" + time_str + val + "\n" + val_show_sign_info;
    }


    var person_count = 0;
    var val_show_person_info_export = "";

    function showPersonInfo(val) {
        person_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_person_info = "Online tag (parsed content): " + time_str + val + "\n" + val_show_person_info;
    }


    var basestate_count = 0;
    var val_show_base_state_export = "";

    function showBaseState(val) {
        basestate_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_base_state = "Anchor data (parsed content): " + time_str + val + "\n" + val_show_base_state;
    }


    function showBtns(val) {
        val = JSON.stringify(val);
        val_show_command = "Command:" + time_str + val + "\n" + val_show_command;
    }
    var video_count = 0;
    var val_show_video_state_export = "";

    function showVideState(val) {
        video_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_video_state = "Video linkage JSON data:" + time_str + val + "\n" + val_show_video_state;
    }


    function HEXto16Str(hex) {
        var newstr = '';
        for (var i = 0; i < hex.length; i++) {
            var s = "00" + hex[i].toString(16);
            numto16 = s.substr(s.length - 2, 2);
            newstr += numto16;
        }
        return newstr
    }

    function tagId216String(data){

    }

    window.ClearShowInfo = function () {
        val_show_tag_pos = "";
        val_show_gao_jing = "";
        val_show_dm_data = "";
        val_modfiy_data = "";
        val_show_append_info = "";
        val_show_study_info="";
        val_show_person_info = "";
        val_show_base_state = "";
        val_show_command = "";
        val_show_video_state = "";
        val_show_area_info = "";
        val_show_tag_power = "";
        val_show_sign_info = "";
    }

    window.ToggleBasicClicked = function () {
        var password = document.getElementById("password").value;
        if(password == ''){alert('Please enter the websocket connection password');return;}
        window.CloseWebsocket();
        window.ClearShowInfo();
        $("#connetbtn").attr("disabled", "disabled");
        var time = 3;
        $("#connetbtn").text(time);
        var timer = setInterval(() => {
            time--
            $("#connetbtn").text(time);
            if (time == 0) {
                clearInterval(timer);
                $("#connetbtn").removeAttr("disabled", "disabled");
                $("#connetbtn").text("Connect");
            }
        }, 1000);
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        if (ws_api) {
            var url = window.document.getElementById("serverip").value;
            var username = document.getElementById("username").value;
            if (salt_val == null || salt_val == "") {
                salt_val = "";
            } 
            ws_api.SetAccount(username, password, salt_val);
            ws_api.ClearBuffer();

            if (url == '' || url == undefined) {
                alert('Please input the server address');
            }

            //RequireBasicInfo：including tag location, battery information, alarm information
            //Roll call data, modification data, personnel information and other data are as follows:
            ws_api.onRecvTagPos = function (obj) {
                UpdateFilterTag(obj);
                showTagPos(obj);
            };

            ws_api.onRecvTagPower = function (obj) {
                showTagPower(obj);
            };
            ws_api.onRecvTagIotInfo = function (obj) {
                showTagIot(obj);
            };

            ws_api.onRecvGaojing = function (obj) {
                showGaoJing(obj);
            };

            ws_api.onRecvAreaInfo = function (obj) {
                showAreaInfo(obj);
            };

            ws_api.onRecvDmData = function (obj) {
                showDmData(obj);
            };


            ws_api.onRecvHeartInfo = function (obj) {
                showHeartInfo(obj);
            };
            ws_api.onRecvSignInfo = function (obj) {
                showSignData(obj);
            };

            ws_api.onRecvPersonInfo = function (obj) {
                showPersonInfo(obj);
            };

            // ws_api.onRecvErrorInfo = function (obj) {
            //     showPersonInfo(obj);
            // };

            //RequireExtraInfo：Additional information, including Anchor data, is as follows:
            ws_api.onRecvBaseStData = function (obj) {
                showBaseState(obj);
            };


            ws_api.onRecvClickSwitchBack = function (obj) {
                showBtns(obj);
            };

            //Video linkage and disable video
            ws_api.onRecvVideoChange = function (obj) {
                showVideState(obj);
            };
            ///Video Linkage
            ws_api.onSendVideoRequest = function (param) {
                val_show_command = "Command: " + time_str + param + "\n" + val_show_command;
            }
            //Disable Video
            ws_api.onSendVideoClose = function (param) {
                val_show_command = "Command: " + time_str + param + "\n" + val_show_command;
            }
            //Temporary evacuation command
            ws_api.onSendDrawRequest = function (param) {
                val_show_command = "Command: " + time_str + param + "\n" + val_show_command;
            }

            //Tag vib & buz command
            ws_api.onSendTagShakeRequest = function (param) {
                val_show_command = "Command: " + time_str + param + "\n" + val_show_command;
            }

            // ws error
            ws_api.onError = function (obj) {
                val_show_command = "The websocket connection is incorrect.";
            }

            ws_api.onOpen = function (obj) {
                val_show_command = obj;
            }

            ws_api.onClose = function (obj) {
                val_show_command = obj + "\n" + val_show_command;
            }
            //Default ws protocol
            let protocol = document.getElementById("protocol").value
            ws_api.RequireBasicInfo(url,protocol);
            ws_api.RequireExtraInfo(url,protocol);
            ws_api.RequireControlInfo(url,protocol);
            //wss protocol
            // ws_api.RequireBasicInfo(url,'wss');
            // ws_api.RequireExtraInfo(url,'wss');
            // ws_api.RequireControlInfo(url,'wss');
			

            //Position data output mode           
            var posOutPutOptionObj = document.getElementById("posOutPutOption");
			posOutPutOptionObj.addEventListener("click", function(obj){
                var selectedPosOption = obj.target.value;
				ws_api.setPosOutType(selectedPosOption);
			});
			ws_api.setPosOutType(posOutPutOptionObj.value);
            //For the demo to demonstrate the use of hexadecimal, the actual usage scenario can be ignored
            ws_api.setTag64Show(true);

            // var selected_val = document.getElementById(select_id).value;
        }
    }

    //The client is disconnected
    window.CloseWebsocket = function () {
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        if (ws_api) {
            ws_api.RejectBasicInfo();
            ws_api.RejectExtraInfo();
            ws_api.RejectControlInfo();
            delData(false);
            val_show_command = "Command: " + time_str + "The server is disconnected." + "\n" + val_show_command;
        }
    };

    // Button click back
    window.SwitchBtnClick = function (type, state) {
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        ws_api.Send2WS_RequsetSwitch(type, state);
    };

    // Filter button
    var rss_content = "";
    window.RssTagClicked = function () {
        rss_content = document.getElementById("Rss_content").value;
        if (rss_content == null || rss_content == "") {
            alert("Please enter the tag to subscribe to")
        } else {
            val_show_tag_pos = "";
            var ws_api = window.LOCALSENSE.WEBSOCKET_API;
            ws_api.Send2WS_RssTagClicked(rss_content);
			let allmap = ""//If empty, subscribe to all
            ws_api.Send2WS_RssMapClicked(allmap);
            val_show_command = "Command:" + time_str + "Subscribed tags are:" + rss_content + "\n" + val_show_command;
        };
    }
    window.RssGroupClicked = function () {
        rss_content = document.getElementById("Rss_content").value;
        if (rss_content == null || rss_content == "") {
            alert("Please enter the group to subscribe to")
        } else {
            var ws_api = window.LOCALSENSE.WEBSOCKET_API;
            ws_api.Send2WS_RssGroupClicked(rss_content);
            val_show_command = "Command:" + time_str + "Subscribed groups are:" + rss_content + "\n" + val_show_command;
        }
    };
    window.RssMapClicked = function () {
        rss_content = document.getElementById("Rss_content").value;
        if (rss_content == null || rss_content == "") {
            alert("Please enter the layer to subscribe to")
        } else {
            val_show_tag_pos = "";
            var ws_api = window.LOCALSENSE.WEBSOCKET_API;
            ws_api.Send2WS_RssMapClicked(rss_content);
			//Then subscribe to all tags(Otherwise, if you have previously sent a subscription by layer, the label of the non-subscribed layer will not be subscribed)
            let alltag = "";//If empty, subscribe to all
            ws_api.Send2WS_RssTagClicked(alltag);
            val_show_command = "Command:" + time_str + "Subscribed layers are:" + rss_content + "\n" + val_show_command;
        }
    };

    window.NoFiliter = function () {
        document.getElementById("Rss_content").value = null;
        window.CloseWebsocket();
        window.ToggleBasicClicked();
    }


    var g_filter_tag = "";
    window.FilterTag = function () {
        g_filter_tag = document.getElementById("filter_tag").value;
    }
    window.VideoOpenBtnClick = function () { //Enabling Video Linkage
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        var tag = parseInt(g_filter_tag,16)
        ws_api.Send2WS_RequsetVideoOpen(tag);
    };
    window.VideoCloseBtnClick = function () { //Disabling Video Linkage
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        var tag = parseInt(g_filter_tag,16)
        ws_api.Send2WS_RequsetVideoClose(tag);
    };
    
    window.TagShakeBuzzBtnClick = function () { //Tag vib & buz
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        var conf_type = "tagvibrateandshake"; //Tag vib & buz type
        var conf_value = "enable";
        var tag = parseInt(g_filter_tag,16)
        ws_api.Send2WS_RequsetTagShakeBuzzReq(conf_type, conf_value, tag);
    };



}());