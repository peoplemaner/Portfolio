/**************** 서버 모니터링 ****************/

실행중인 각 서버에 REST 요청을 하여, HealthCheck 또는 가장 시간이 오래 걸리는 API를 호출하여
실시간으로 서버 상태를 체크하여 장애 상황 발생 시 네이트온 Webhook으로 통보해주는 프로젝트

특이점
config 설정을 통해 requestTimeOut, 호출 빈도 등 설정을 통해 장애 상태 기준 변경 가능.
node scheduler를 사용하여 API 호출 평균 시간 집계 가능.
winstom 모듈을 사용하여 로그 기록
서버 실행은 forever 모듈 사용.

/********************************************/

live
  - start : ../server/node_modules/forever/.bin/forever start --uid "lmonit" --id "lmonit" app.js live
  - logPath : ./logsDevelopment
  
dev start
  - start : ../server/node_modules/forever/.bin/forever start --uid "dmonit" --id "dmonit" app.js dev
  - logPath : ./logsLive