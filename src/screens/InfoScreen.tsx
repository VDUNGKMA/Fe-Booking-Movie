import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'; // Đường dẫn đến theme của bạn

const InfoScreen = ({ route, navigation }: any) => {
    const { user } = route.params; // Lấy thông tin người dùng từ route.params
    const [isModalVisible, setModalVisible] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username); // Khởi tạo giá trị mới cho username

    const handleChangePasswordPress = () => {
        navigation.navigate('ChangePwdScreen');
    };

    const handleSaveUsername = () => {
        if (newUsername) {
            // Lưu username mới (giả sử)
            setModalVisible(false);
            // Thêm logic để lưu lại username mới vào dữ liệu người dùng (có thể sử dụng API hoặc context)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Information</Text>

            {/* Username */}
            <View style={styles.textBox}>
                <Text style={styles.infoLabel}>Username: {newUsername}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editIcon}>
                    <Image
                        source={require('../assets/image/pencil-square.png')} // Đường dẫn đến ảnh icon
                        style={styles.icon} // Định dạng style cho icon
                    />
                </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.textBox}>
                <Text style={styles.infoLabel}>Email: {user.email}</Text>
            </View>

            {/* Contact Number */}
            <View style={styles.textBox}>
                <Text style={styles.infoLabel}>Contact Number: {user.phone_number}</Text>
            </View>

            {/* Change Password Button */}
            <TouchableOpacity style={styles.button} onPress={handleChangePasswordPress}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>

            {/* Modal để thay đổi Username */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Username</Text>
                        <TextInput
                            style={styles.input}
                            value={newUsername}
                            onChangeText={setNewUsername}
                            placeholder="Enter new username"
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveUsername}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
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
        backgroundColor: COLORS.Black, // Nền màu đen
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        marginBottom: SPACING.space_20,
        color: COLORS.White, // Text màu trắng để dễ đọc trên nền đen
    },
    textBox: {
        backgroundColor: COLORS.White, // Text box màu trắng
        padding: SPACING.space_12,
        borderRadius: 8,
        marginBottom: SPACING.space_15,
        shadowColor: 'rgba(0, 0, 0, 0.4)', // Đổ bóng với màu mờ hơn để tạo sự mềm mại
        shadowOffset: { width: 0, height: 6 }, // Vị trí đổ bóng
        shadowOpacity: 0.3, // Độ mờ của bóng để tạo hiệu ứng nhẹ hơn
        shadowRadius: 10, // Bán kính đổ bóng lớn hơn
        elevation: 12, // Đổ bóng cho Android
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoLabel: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.Black, // Text màu đen trên nền trắng của text box
    },
    editIcon: {
        marginLeft: 10,
    },
    icon: {
        width: 24,  // Chiều rộng icon
        height: 24, // Chiều cao icon
    },
    button: {
        marginTop: SPACING.space_20,
        backgroundColor: COLORS.Orange, // Nút màu cam
        paddingVertical: SPACING.space_12,
        paddingHorizontal: SPACING.space_24,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.White, // Text màu trắng trên nút cam
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Nền trong suốt mờ
    },
    modalContent: {
        backgroundColor: COLORS.White, // Nền trắng cho modal
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
