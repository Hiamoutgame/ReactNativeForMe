# Ghi chú wireframe Weather App

## Mức hiểu hiện tại

Wireframe đang mô tả một app thời tiết dạng mobile, ưu tiên màn hình dọc. App có nhiều phần UI nhưng chưa cần bước vào code ngay. Trọng tâm là xác định bố cục, vai trò từng block, và hướng chia component để sau này implement đúng ý.

## Quy ước màu trong wireframe

- Màu cam: phần tiêu đề chính hoặc thông tin nổi bật.
- Màu đỏ: đoạn giới thiệu ngắn, nhãn phụ, hoặc text ngắn cần nhấn.
- Màu xám: card, vùng chứa, ô nhập/search, hoặc item phụ.
- Màu xanh lá: vùng content chính của một card/section.
- Màu đen: icon, ảnh đại diện/thumbnail, hoặc vùng media/icon placeholder.
- Mũi tên: hành động xem chi tiết hoặc điều hướng sang nội dung khác.


## Bản vẽ sơ bộ trong note

### Legend component card

```text
+------------------------------------------------+
|  [======== Title ========]                     |
|      [------ giới thiệu ngắn ------]           |
|                                                |
|  [================ Card ================]      |
|                              -> xem chi tiết   |
|                                                |
|  [############### Content ###############]     |
|                                                |
|                              [Icon]            |
+------------------------------------------------+
```

Ý nghĩa nhanh:

- `[========]`: vùng title/nội dung nổi bật màu cam.
- `[------]`: text phụ/giới thiệu ngắn màu đỏ.
- `[================]`: card hoặc vùng chứa màu xám.
- `[###############]`: content chính màu xanh lá.
- `[Icon]`: icon/thumbnail màu đen.
- `->`: action xem chi tiết hoặc chuyển màn.

### Màn search/location

```text
+------------------------------+
|                              |
|                              |
|        [==== Title ====]      |
|          [--- desc ---]       |
|  ( search city/location    )  |
|                              |
|                              |
|        vùng kết quả trống     |
|                              |
|                              |
+------------------------------+
```

Ý hiểu: màn này tập trung vào search. Khi user nhập thành phố, vùng trống phía dưới sẽ hiển thị kết quả hoặc gợi ý địa điểm.

### Màn dashboard có carousel vuốt ngang

```text
+------------------------------+
| <                            |
| [========= Weather =========]|
| [========= Header ==========]|
|                              |
| +----------+ +----------+    |
| | card ->  | | card ->  |    |
| | forecast | | forecast |    |  <- carousel vuốt ngang
| +----------+ +----------+    |
|                              |
| [icon] [icon] [icon] [icon]  |
|                              |
| +-------------+ +----------+ |
| | bottom ->   | | bottom ->| |
| | card        | | card     | |
| +-------------+ +----------+ |
+------------------------------+
```

Ý hiểu: header trên cùng là thông tin thời tiết chính. Các card xám bên dưới là dữ liệu phụ/dự báo, có khả năng vuốt ngang. Dòng icon là shortcut hoặc chỉ số thời tiết nhanh.

### Màn home/dashboard chi tiết

```text
+------------------------------+
| <                            |
| [========= Current =========]|
| [========= Weather =========]|
|                              |
| +--------------------------+ |
| | [-- label --]      [ICON]| |
| | [--] [--]          [ICON]| |  <- summary/content chính
| +--------------------------+ |
|                              |
| +--------------------------+ |
| | [-] [====]  [icon] [o][o]| |
| +--------------------------+ |
| | [-] [====]  [icon] [o][o]| |  <- danh sách forecast/info
| +--------------------------+ |
| | [-] [====]  [icon] [o][o]| |
| +--------------------------+ |
| | [-] [====]  [icon] [o][o]| |
| +--------------------------+ |
|                              |
+------------------------------+
```

Ý hiểu: đây là màn chính hoàn chỉnh hơn. Phần đầu hiển thị thời tiết hiện tại, phần giữa là summary nổi bật, phần dưới là danh sách dự báo/chỉ số thời tiết.

## Các màn hình/khối UI đang có trong wireframe

### 1. Component card tổng quát

Card mẫu gồm các thành phần:

- Title: thanh/cụm tiêu đề nổi bật.
- Giới thiệu ngắn gọn: dòng mô tả ngắn nằm dưới title.
- Card container: vùng nền chứa nội dung phụ.
- Xem chi tiết: text/action kèm mũi tên, dùng để đi tới màn chi tiết hoặc mở thêm thông tin.
- Content: vùng nội dung chính, có thể là mô tả thời tiết, dự báo, hoặc dữ liệu nổi bật.
- Icon: biểu tượng nhỏ đại diện cho loại thông tin.

Ý hiểu: đây là component tái sử dụng, không chỉ dùng cho một màn hình. Sau này có thể tách thành `WeatherInfoCard` hoặc `BaseCard` tùy mức tái sử dụng.

### 2. Màn hình search/location đơn giản

Wireframe có một màn hình điện thoại với:

- Một vùng title ở gần phía trên.
- Một dòng mô tả ngắn bên dưới.
- Một ô search nằm ngang.
- Phần nội dung bên dưới hiện đang trống.

Ý hiểu: đây có thể là màn chọn/thêm địa điểm hoặc tìm kiếm thành phố. Search bar là thành phần chính, kết quả search sẽ render ở vùng trống phía dưới.

### 3. Màn hình dashboard dạng carousel

Wireframe có một màn hình nền xanh ngọc, gồm:

- Nút quay lại ở góc trên trái.
- Header/card lớn màu cam ở phía trên, đại diện cho thông tin thời tiết chính.
- Một hàng card xám phía dưới, chia thành nhiều cột, có mũi tên nhỏ.
- Một hàng icon màu đen bên dưới.
- Một cụm card xám ở cuối màn hình, chia 2 cột.

Ghi chú trên wireframe nói: `Cái này là carousel có khả năng vuốt`.

Ý hiểu: phần các card xám là danh sách dự báo hoặc thông tin thời tiết có thể vuốt ngang. Có thể dùng carousel/horizontal scroll để xem nhiều item. Mũi tên là hint điều hướng hoặc xem chi tiết từng item.

### 4. Màn hình home/dashboard chi tiết

Wireframe cuối có kích thước khoảng `430 x 809`, gồm:

- Nền chính xanh ngọc.
- Nút quay lại ở góc trên trái.
- Header thời tiết chính màu cam ở đầu màn hình.
- Một section xanh lá ngay dưới header, chứa:
  - Text ngắn bên trái.
  - Hai nút/nhãn nhỏ màu đỏ bên dưới.
  - Một khối đen lớn bên phải, có thể là icon thời tiết, ảnh minh họa, hoặc biểu đồ.
- Một danh sách nhiều dòng ở dưới, mỗi dòng gồm:
  - Nhãn/title màu cam bên trái.
  - Text phụ màu đỏ phía trên hoặc gần title.
  - Icon/thumbnail màu đen ở giữa.
  - Hai indicator nhỏ màu xanh lá bên phải.

Ý hiểu: đây là màn hình chính sau khi đã chọn địa điểm. Nó hiển thị thời tiết hiện tại ở phần trên và danh sách dữ liệu/dự báo ở phần dưới.

## Luồng người dùng dự kiến

1. User mở app vào màn home hoặc màn search location.
2. User tìm kiếm/chọn thành phố bằng search bar.
3. App hiển thị dashboard thời tiết chính của địa điểm đã chọn.
4. User có thể vuốt carousel để xem dự báo/thông tin theo giờ hoặc theo ngày.
5. User có thể bấm `xem chi tiết` hoặc mũi tên để vào detail của một card/thông tin.

## Hướng chia component sau này

Chưa code ngay, nhưng nếu implement thì nên chia theo hướng:

- `SearchBar`: ô tìm kiếm địa điểm.
- `WeatherHeaderCard`: card lớn hiển thị thời tiết chính.
- `WeatherInfoCard`: card tổng quát có title, mô tả, content, icon, xem chi tiết.
- `WeatherCarousel`: vùng danh sách ngang có thể vuốt.
- `WeatherSummaryPanel`: section xanh lá ở màn dashboard chi tiết.
- `WeatherForecastList`: danh sách các dòng dự báo/thông tin bên dưới.
- `ForecastListItem`: từng dòng nhỏ trong danh sách.

## Ghi chú implementation sau này

- Vì đây là React Native/Expo, không nên dùng `div`; nên dùng `View`, `Text`, `Pressable`, `ScrollView`, `FlatList`.
- Carousel có thể làm đơn giản bằng `ScrollView horizontal` trước, chưa cần thư viện ngoài nếu scope nhỏ.
- Màu trong wireframe mới là placeholder, khi code nên gom thành constants/theme để dễ chỉnh.
- Các block nên được dựng responsive theo màn hình mobile, không hard-code quá nhiều theo pixel ngoại trừ spacing/card size cần thiết.
- Layout nên ưu tiên tái sử dụng component vì nhiều card có pattern giống nhau.


