//Strict  Mode  -   Using  "constant"  and  "let"  features  and  "import" 

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
var pc = new RTCPeerConnection(configuration);

let isFront = true;
MediaStreamTrack
  .getSources()
  .then(sourceInfos => {
    console.log(sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
        videoSourceId = sourceInfo.id;
      }
    }
    return getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30
        },
        facingMode: (isFront ? "user" : "environment"),
        optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
      }
    });
  })
  .then(stream => {
    console.log('dddd', stream);
    return stream
  })
  .catch(logError);

pc.createOffer()
  .then(pc.setLocalDescription)
  .then(() => {
    // Send pc.localDescription to peer
  })
  .catch(logError);

pc.onicecandidate = function (event) {
  // send event.candidate to peer
};

 -------------------------------------------------------------------------
 'use strict';

import RTCPeerConnection from './RTCPeerConnection';
import RTCIceCandidate from './RTCIceCandidate';
import RTCSessionDescription from './RTCSessionDescription';
import RTCView from './RTCView';
import MediaStream from './MediaStream';
import MediaStreamTrack from './MediaStreamTrack';
import getUserMedia from './getUserMedia';

module.exports = {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia,
};
