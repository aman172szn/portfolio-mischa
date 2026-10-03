update public.works
set audio_path = 'the-order-of-time/order-of-time-movement-1-live.mp3'
where slug = 'the-order-of-time';

update public.work_media
set storage_path = 'the-order-of-time/order-of-time-movement-1-live.mp3'
where storage_bucket = 'audio'
  and storage_path = 'the-order-of-time/order-of-time-movement-1-live.wav';

update public.work_media
set storage_path = 'the-order-of-time/order-of-time-movement-2.mp3'
where storage_bucket = 'audio'
  and storage_path = 'the-order-of-time/order-of-time-movement-2-live.wav';

update public.work_media
set storage_path = 'the-order-of-time/order-of-time-movement-3.mp3'
where storage_bucket = 'audio'
  and storage_path = 'the-order-of-time/order-of-time-movement-3-live.wav';

update public.work_media
set storage_path = 'the-order-of-time/order-of-time-movement-5.mp3'
where storage_bucket = 'audio'
  and storage_path = 'the-order-of-time/order-of-time-movement-5-live.wav';

