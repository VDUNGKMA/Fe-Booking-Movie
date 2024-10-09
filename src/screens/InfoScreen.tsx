import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';
import { updateUsername } from '../api/api'; // Import hàm API

const InfoScreen = ({ route, navigation }: any) => {
    const { user } = route.params; // Lấy thông tin người dùng từ route.params
    const [isModalVisible, setModalVisible] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username); // Khởi tạo giá trị mới cho username
    const [loading, setLoading] = useState(false); // State cho việc loading

    const handleChangePasswordPress = () => {
        navigation.navigate('ChangePwdScreen', { userId: user.id });
    };

    // const handleSaveUsername = async () => {
    //     if (newUsername && newUsername !== user.username) {
    //         setLoading(true); // Bắt đầu trạng thái loading
    //         try {
    //             // Gọi API để cập nhật username
    //             const response = await updateUsername(user.id, newUsername);
    //             console.log('Response from server:', response); // Log phản hồi từ server

    //             // Kiểm tra phản hồi từ server
    //             if (response && response.status === "success") { // Sửa điều kiện ở đây
    //                 Alert.alert('Thành công', 'Tên người dùng đã được cập nhật.');
    //                 setModalVisible(false);
    //                 setNewUsername(response.data.user.username); // Cập nhật tên người dùng từ phản hồi
    //             } else {
    //                 // Nếu không thành công
    //                 Alert.alert('Lỗi', response.message || 'Cập nhật tên người dùng thất bại.');
    //             }
    //         } catch (error) {
    //             // Nếu có lỗi, hiển thị thông báo lỗi
    //             console.error('Error updating username:', error); // Log lỗi để kiểm tra
    //             Alert.alert('Lỗi', 'Cập nhật tên người dùng thất bại.');
    //         } finally {
    //             setLoading(false); // Kết thúc trạng thái loading
    //         }
    //     } else {
    //         Alert.alert('Thông báo', 'Tên người dùng không được để trống hoặc trùng với tên hiện tại.');
    //     }
    // };

    const handleSaveUsername = async () => {
        if (newUsername && newUsername !== user.username) {
            setLoading(true); // Bắt đầu trạng thái loading
            try {
                // Gọi API để cập nhật username
                const response = await updateUsername(user.id, newUsername);
                console.log('Response from server:', response); // Log phản hồi từ server

                // Kiểm tra phản hồi từ server
                if (response && response.status === "success") { // Sửa điều kiện ở đây
                    Alert.alert('Thành công', 'Tên người dùng đã được cập nhật.');
                    setModalVisible(false);
                    setNewUsername(response.data.user.username); // Cập nhật tên người dùng từ phản hồi

                    // Cập nhật thông tin người dùng trong UserAccountScreen
                    navigation.setParams({ user: { ...user, username: response.data.user.username } });
                } else {
                    // Nếu không thành công
                    Alert.alert('Lỗi', response.message || 'Cập nhật tên người dùng thất bại.');
                }
            } catch (error) {
                // Nếu có lỗi, hiển thị thông báo lỗi
                console.error('Error updating username:', error); // Log lỗi để kiểm tra
                Alert.alert('Lỗi', 'Cập nhật tên người dùng thất bại.');
            } finally {
                setLoading(false); // Kết thúc trạng thái loading
            }
        } else {
            Alert.alert('Thông báo', 'Tên người dùng không được để trống hoặc trùng với tên hiện tại.');
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin người dùng</Text>

            {/* Username */}
            <View style={styles.textBox}>
                <Text style={styles.infoLabel}>Tên người dùng: {newUsername}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editIcon}>
                    <Image
                        source={require('../assets/image/pencil-square.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.textBox}>
                <Text style={styles.infoLabel}>Email: {user.email}</Text>
            </View>

            {/* Contact Number */}
            <View style={styles.textBox}>
                <Text style={styles.infoLabel}>Số điện thoại: {user.phone_number}</Text>
            </View>

            {/* Change Password Button */}
            <TouchableOpacity style={styles.button} onPress={handleChangePasswordPress}>
                <Text style={styles.buttonText}>Thay đổi mật khẩu</Text>
            </TouchableOpacity>

            {/* Modal để thay đổi Username */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Thay đổi Username</Text>
                        <TextInput
                            style={styles.input}
                            value={newUsername}
                            onChangeText={setNewUsername}
                            placeholder="Nhập username mới"
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveUsername}
                            disabled={loading} // Vô hiệu hóa khi đang loading
                        >
                            <Text style={styles.saveButtonText}>
                                {loading ? 'Đang lưu...' : 'Lưu'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.space_20,
        backgroundColor: COLORS.Black,
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        marginBottom: SPACING.space_20,
        color: COLORS.White,
    },
    textBox: {
        backgroundColor: COLORS.White,
        padding: SPACING.space_12,
        borderRadius: 8,
        marginBottom: SPACING.space_15,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoLabel: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.Black,
    },
    editIcon: {
        marginLeft: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    button: {
        marginTop: SPACING.space_20,
        backgroundColor: COLORS.Orange,
        paddingVertical: SPACING.space_12,
        paddingHorizontal: SPACING.space_24,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.White,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: COLORS.White,
        padding: SPACING.space_20,
        borderRadius: 8,
        width: '80%',
    },
    modalTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_20,
        marginBottom: SPACING.space_12,
        color: COLORS.Black,
        textAlign: 'center',
    },
    input: {
        borderColor: COLORS.Grey,
        borderWidth: 1,
        padding: SPACING.space_12,
        borderRadius: 8,
        marginBottom: SPACING.space_20,
        color: COLORS.Black,
    },
    saveButton: {
        backgroundColor: COLORS.Orange,
        paddingVertical: SPACING.space_12,
        borderRadius: 8,
    },
    saveButtonText: {
        color: COLORS.White,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_medium,
    },
    cancelButton: {
        marginTop: SPACING.space_12,
        backgroundColor: COLORS.Grey,
        paddingVertical: SPACING.space_12,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: COLORS.White,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_medium,
    },
});

export default InfoScreen;