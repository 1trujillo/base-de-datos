-- =====================================
-- PACKAGE: pkg_pujas_control
-- =====================================

CREATE OR REPLACE PACKAGE pkg_pujas_control AS
    -- Función pública
    FUNCTION validar_puja(id_sub NUMBER, monto NUMBER) RETURN VARCHAR2;

    -- Procedimiento público que llama a la función privada (internamente)
    PROCEDURE procesar_puja(
        p_id_subasta IN NUMBER,
        p_id_usuario IN NUMBER,
        p_monto IN NUMBER
    );
END pkg_pujas_control;
/

CREATE OR REPLACE PACKAGE BODY pkg_pujas_control AS

    -- Función privada: obtiene la puja máxima actual de una subasta
    FUNCTION obtener_max_puja(p_id_sub NUMBER) RETURN NUMBER IS
        v_max NUMBER;
    BEGIN
        SELECT NVL(MAX(monto_puja), 0)
        INTO v_max
        FROM pujas
        WHERE id_subasta = p_id_sub;
        RETURN v_max;
    END obtener_max_puja;

    -- Función pública: valida que la puja sea mayor que la actual
    FUNCTION validar_puja(id_sub NUMBER, monto NUMBER) RETURN VARCHAR2 IS
        v_max NUMBER;
    BEGIN
        v_max := obtener_max_puja(id_sub);
        IF monto > v_max THEN
            RETURN 'VALIDA';
        ELSE
            RETURN 'INVALIDA';
        END IF;
    END validar_puja;

    -- Procedimiento: intenta insertar una puja si es válida
    PROCEDURE procesar_puja(
        p_id_subasta IN NUMBER,
        p_id_usuario IN NUMBER,
        p_monto IN NUMBER
    ) IS
        v_valida VARCHAR2(10);
    BEGIN
        v_valida := validar_puja(p_id_subasta, p_monto);

        IF v_valida = 'VALIDA' THEN
            INSERT INTO pujas (id_subasta, id_usuario, monto_puja)
            VALUES (p_id_subasta, p_id_usuario, p_monto);
            COMMIT;
        ELSE
            RAISE_APPLICATION_ERROR(-20001, 'La puja no supera la actual máxima.');
        END IF;
    END procesar_puja;

END pkg_pujas_control;
/

-- Trigger a nivel de sentencia (para auditoría de inserciones)
CREATE OR REPLACE TRIGGER trg_pujas_stmt
BEFORE INSERT ON pujas
DECLARE
BEGIN
    DBMS_OUTPUT.PUT_LINE('Intento de inserción de nuevas pujas detectado.');
END;
/

-- Trigger a nivel de fila (valida monto usando el package)
CREATE OR REPLACE TRIGGER trg_pujas_row
BEFORE INSERT ON pujas
FOR EACH ROW
DECLARE
    v_resultado VARCHAR2(10);
BEGIN
    v_resultado := pkg_pujas_control.validar_puja(:NEW.id_subasta, :NEW.monto_puja);
    IF v_resultado = 'INVALIDA' THEN
        RAISE_APPLICATION_ERROR(-20002, 'La puja es menor o igual que la máxima actual.');
    END IF;
END;










SET SERVEROUTPUT ON;


BEGIN
    pkg_pujas_control.procesar_puja(
        p_id_subasta => 1,
        p_id_usuario => 103,
        p_monto      => 800  -- mayor a la actual (750)
    );
    DBMS_OUTPUT.PUT_LINE('✅ Puja insertada correctamente.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('❌ Error: ' || SQLERRM);
END;
/


BEGIN
    pkg_pujas_control.procesar_puja(
        p_id_subasta => 1,
        p_id_usuario => 1,
        p_monto      => 6100 
    );
    DBMS_OUTPUT.PUT_LINE('✅ Puja insertada correctamente.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('❌ Error: ' || SQLERRM);
END;
/

SELECT * FROM pujas;
/
